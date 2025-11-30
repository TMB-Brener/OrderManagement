
using Microsoft.AspNetCore.Mvc;
using OrderManagement.Domain;
using OrderManagement.Infrastructure;
using Azure.Messaging.ServiceBus;

namespace OrderManagement.Api.Controllers
{
    [ApiController]
    [Route("orders")]
    public class OrdersController : ControllerBase
    {
        private readonly OrderDbContext _db;
        //private readonly ServiceBusSender _sender;
        public OrdersController(OrderDbContext db)//, ServiceBusClient sb)
        {
            _db = db;
            //_sender = sb.CreateSender("orders");
        }

        [HttpPost]
        public async Task<IActionResult> Create(Order order) //create route orders
        {
            order.Status = "Pendente";      //adjust status
            _db.Orders.Add(order);          //EntityFramework - Begins tracking the given entity, and any other reachable entities that are not already being tracked, in the Added state such that they will be inserted into the database when SaveChanges() is called.
            await _db.SaveChangesAsync();   //EntityFramework - Saves all changes made in this context to the database.

            //var message = new ServiceBusMessage(order.Id.ToString());
            //message.ApplicationProperties["EventType"] = "OrderCreated";
            //message.CorrelationId = order.Id.ToString();

            //await _sender.SendMessageAsync(message);

            return Ok(order);
        }

        [HttpGet]
        public IActionResult GetAll() =>
            Ok(_db.Orders.ToList());

        [HttpGet("{id}")]
        public IActionResult Get(Guid id) =>
            Ok(_db.Orders.FirstOrDefault(x => x.Id == id));
    }
}
