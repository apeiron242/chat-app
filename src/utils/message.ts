import moment from "moment";

function formatMessage(username: string, text: string) {
  return {
    username,
    text,
    time: moment().format("YYYY/MM/DD h:mm a"),
  };
}

export default formatMessage;
