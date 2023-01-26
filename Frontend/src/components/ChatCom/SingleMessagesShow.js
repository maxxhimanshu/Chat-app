import { Avatar } from '@chakra-ui/react';
import React from 'react'
import { ChatState } from '../../Context/MyProvider';

const SameSenderChecker = function (messages, userId, i, curM) {
  return (
    i < messages.length - 1 && (messages[i + 1].sender._id !== curM.sender._id ||
      messages[i + 1].sender._id === undefined) && messages[i].sender._id !== userId
  )

};
const lastMessage = function (messages, i, userId) {
  return (
    i === messages.length - 1 &&
    messages[messages.length - 1].sender._id !== userId &&
    messages[messages.length - 1].sender._id
  )
}

export const isSameSenderMargin = (messages, m, i, userId) => {
  // console.log(messages[i].sender._id !== userId, userId);

  if (
    i < messages.length - 1 &&
    messages[i + 1].sender._id === m.sender._id &&
    messages[i].sender._id !== userId
  )
    return 33;
  else if (
    (i < messages.length - 1 &&
      messages[i + 1].sender._id !== m.sender._id &&
      messages[i].sender._id !== userId) ||
    (i === messages.length - 1 && messages[i].sender._id !== userId)
  )
    return 0;
  else return "auto";
};
 
export const isSameUser = (messages, m, i) => {
  return i > 0 && messages[i - 1].sender._id === m.sender._id;
};




export const SingleMessagesShow = ({ messages }) => {

  const { user } = ChatState()

  return (
    <div>{
      messages && messages.map((msg, i) => (

        <div display="flex" key={msg.id}>

          {(SameSenderChecker(messages, user._id, i, msg) || lastMessage(messages, i, user._id)) &&
            (<>
              <Avatar
                mr={0}
                size={"sm"}

                cursor="pointer"
                name={msg.sender.firstName + " " + msg.sender.lastName}
              />
            </>)
          }
          <span style={{
            background: `${msg.sender._id === user._id ? "pink" : "skyblue"}`, borderRadius: "20px", padding: "5px 15px", maxWidth: "75%",
            marginLeft: isSameSenderMargin(messages, msg, i, user._id),
            marginTop: isSameUser(messages, msg, i, user._id)?3:100,
          }}

          >

            {msg.body}
          </span>


        </div>))



    }</div>
  )
}
