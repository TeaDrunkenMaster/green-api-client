import { Component } from "react";


class apiGreen extends Component
{ 
    constuctor(props){     
      const headers = {
        'Content-Type': 'application/json'
        }

        const response = fetch('https://api.green-api.com/waInstance'+this.props.idInstance+'/SetSettings/'+this.props.apiTokenInstance, { 
        method: 'POST', 
        headers: headers,
        body: JSON.stringify({
          "countryInstance": "ru",
          "webhookUrl": "https://mysite.com/webhook/green-api/",
          "webhookUrlToken": "",
          "delaySendMessagesMilliseconds": 1000,
          "markIncomingMessagesReaded": "no",
          "markIncomingMessagesReadedOnReply": "no",
          "outgoingWebhook": "yes",
          "outgoingMessageWebhook": "yes",
          "stateWebhook": "yes",
          "incomingWebhook": "yes",
          "deviceWebhook": "no",
          "statusInstanceWebhook": "yes" 
      }),
        mode: "no-cors"
      }).then((response)=>{return response.json});
    }

     async SendMessage(request)  {
        const headers = {
        'Content-Type': 'application/json'
        }

        let response=await fetch('https://api.green-api.com/waInstance'+this.props.idInstance+'/SendMessage/'+this.props.apiTokenInstance, { 
        method: 'POST', 
        headers: headers,
        body: JSON.stringify(request),
        mode: "no-cors"
      });
    }

       async ReceiveMessage()  {
        const headers = {
        'Content-Type': 'application/json'
        }

        let response=await fetch('https://api.green-api.com/waInstance'+this.props.idInstance+'/ReceiveNotification/'+this.props.apiTokenInstance, { 
        method: 'GET', 
        headers: headers
      });
      let jsonData = await response.json();
    
      return jsonData;
    }


     DeleteMessage(receiptId)  {
      const headers = {
      'Content-Type': 'application/json'
      }

      let response= fetch('https://api.green-api.com/waInstance'+this.props.idInstance+'/DeleteNotification/'+this.props.apiTokenInstance+'/'+receiptId, { 
      method: 'DELETE', 
      headers: headers
    });
  }
}

export default apiGreen
