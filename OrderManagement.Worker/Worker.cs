using Azure.Messaging.ServiceBus;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using OrderManagement.Infrastructure;

namespace OrderManagement.Worker
{
    public class Worker : BackgroundService
    {
        private readonly ServiceBusProcessor _processor;
        private readonly IServiceProvider _provider;

        public Worker(ServiceBusClient sb, IServiceProvider provider)
        {
            _provider = provider;
            _processor = sb.CreateProcessor("orders");
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            _processor.ProcessMessageAsync += ProcessMessage;
            _processor.ProcessErrorAsync += ErrorHandler;
            await _processor.StartProcessingAsync(stoppingToken);
        }

        private async Task ProcessMessage(ProcessMessageEventArgs args)
        {
            var orderId = Guid.Parse(args.Message.Body.ToString());

            using var scope = _provider.CreateScope();
            var db = scope.ServiceProvider.GetRequiredService<OrderDbContext>();

            var order = await db.Orders.FindAsync(orderId);
            if (order == null) return; // idempotência

            if (order.Status == "Finalizado") return;

            order.Status = "Processando";
            await db.SaveChangesAsync();

            await Task.Delay(5000);

            order.Status = "Finalizado";
            await db.SaveChangesAsync();
        }

        private Task ErrorHandler(ProcessErrorEventArgs args)
        {
            Console.WriteLine(args.Exception);
            return Task.CompletedTask;
        }
    }

}