import { useState } from "react";
import axios from "axios";

function App() {

  const [subject, setSubject] = useState("");
  const [msg, setMsg] = useState("");
  const [emails, setEmails] = useState("");
  const [status, setStatus] = useState("Send Mail");

  async function sendMail() {

    setStatus("Sending...");

    try {

      const emailList = emails.split(",");

      await axios.post("http://localhost:5000/sendemail", {
        subject: subject,
        msg: msg,
        emailList: emailList,
      });

      setStatus("Mail Sent Successfully ✅");

    } 
    
    catch (error) {

      console.log(error);

      setStatus("Failed ❌");

    }
  }

  return (

    <div className="min-h-screen bg-gradient-to-br from-purple-700 via-indigo-700 to-pink-600 flex justify-center items-center p-4">

      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-8">

        <h1 className="text-3xl font-bold text-center text-purple-700 mb-8">
          Bulk Mail Sender
        </h1>

        <div className="space-y-5">

          <input
            type="text"
            placeholder="Enter subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full border border-gray-300 rounded-2xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-purple-500"
          />

          <textarea
            rows="5"
            placeholder="Enter email body"
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            className="w-full border border-gray-300 rounded-2xl px-4 py-3 text-sm outline-none resize-none focus:ring-2 focus:ring-purple-500"
          ></textarea>

          <input
            type="text"
            placeholder="Enter emails separated by comma"
            value={emails}
            onChange={(e) => setEmails(e.target.value)}
            className="w-full border border-gray-300 rounded-2xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-purple-500"
          />

          <div className="border-2 border-dashed border-purple-400 rounded-2xl p-5 bg-purple-50">

            <input
              type="file"
              className="text-sm text-purple-700"
            />

          </div>

          <button
            onClick={sendMail}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-pink-500 hover:to-purple-600 text-base font-medium py-3 rounded-2xl transition duration-300 shadow-lg hover:scale-105 text-white"
          >
            {status}
          </button>

        </div>

      </div>

    </div>

  );
}

export default App;