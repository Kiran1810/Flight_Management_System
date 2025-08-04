const amqplib=require('amqplib');


let connection,channel;

async function connectQueue(){
   try{
        const rabbitMQURL = process.env.RABBIT_MQ_SERVICE;
        connection = await amqplib.connect(rabbitMQURL);
        channel=await connection.createChannel()
        console.log("channel",channel);
       await channel.assertQueue("noti-queue")}
      catch(error){
         console.log(error);
         throw error;

      }
   }

   async function sendData(data){
      try{
         console.log("channel",channel);
         await channel.sendToQueue("noti-queue", Buffer.from(JSON.stringify(data)));
      }
      catch(error){
         console.log(error);
         throw error;
      }
   }



   module.exports={connectQueue,sendData}