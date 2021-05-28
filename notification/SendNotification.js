import axios from "axios";

axios.defaults.baseURL = "https://exp.host";

const SendNotification = async (token,title,body) => {
    const message = {
        to: token,
        sound:"default",
        title,
        body
    }

    await axios.post("/--/api/v2/push/send",message).then().catch((err) => {console.log(err)});
}

export default SendNotification;