import { useEffect, useState } from "react";
import Slave from "./Slave";
import Filter from "./Filter";


function Email() {
    const [email, setEmail] = useState([])
    const [currentEmail, setCurrentEmail] = useState()
    const [currentEmailBody, setCurrentEmailBody] = useState("")
    const [currentEmailSubject, setCurrentEmailSubject] = useState("")
    const [currentEmailTime, setCurrentEmailTime] = useState("")
    const [currentAvatar, setCurrentAvatar] = useState("")
    const [currentId, setCurrentId] = useState(0)

    const [favEmail, setFavEmail] = useState([])
    const [loadScreenStat, setLoadScreenStat] = useState(true)
    const [readStatus, setReadStatus] = useState([])
    
    
    useEffect(() => {
        fetchEmails()
    }, []);

    async function fetchEmails() {
        await fetch("https://flipkart-email-mock.now.sh/")
            .then((response) => { return response.json() })
            .then((data) => { setEmail(data.list) })
            .then(email.map((item) => {
                return item['read'] = false
            }))
    }

    async function fetchCurrentEmail(id) {
        await fetch(`https://flipkart-email-mock.now.sh/?id=${id}`)
            .then((response) => { return response.json()})
            .then((data) => {
                setCurrentEmail(data)
                setCurrentEmailBody(data.body)
                
            })
        
    }

     function setReadUnread(readIndex) {
         console.log(readIndex)
         const updatedEmailObject = { ...email[readIndex], read: true};
         const newEmail = [...email];
         newEmail[readIndex] = updatedEmailObject;
         setEmail(newEmail)
        
    }

    const handleEmailClick = (id) => {
        fetchCurrentEmail(id)
    }
    const getFavFromSlave = (favEmailID) => {
        let filterFavEmail = email.filter((item) => item.id == favEmailID)
        setFavEmail([...favEmail,...filterFavEmail])
    }

    const toogleMainScreen = (getFavClickStatus) => {   
        if (getFavClickStatus && favEmail.length>=1) {
            setLoadScreenStat(false)
        }
        else {
            setLoadScreenStat(true)
        }
    }
    return (
        <>
            <Filter favEmail={favEmail}
                toogleMainScreen={toogleMainScreen}
                email={email}
            />
            {
                loadScreenStat && 
                <section className={currentEmail ? "email--main--shrink" : "email--main"}>
                <div className={currentEmail ? "email--container--shrink" : "email--container"}>
                    {
                            email.map((item, index) => {
                            
                                var favButtonRender = false
                                
                                favEmail.forEach(element => {
                                    if (element.id == item.id) {
                                        favButtonRender = true
                                    }
                                });

                            var date = new Date(item.date)
                            var time = ""
                            if (date.getHours() >= 12) {
                                time = "0" + date.getHours() % 12 + ":" +((parseInt(date.getMinutes()/5)*5).toString().length==2?(parseInt(date.getMinutes()/5)*5).toString():"0"+(parseInt(date.getMinutes()/5)*5).toString()) +"pm"
                            }
                            else{
                                time = "0" + date.getHours() + ":" +((parseInt(date.getMinutes()/5)*5).toString().length==2?(parseInt(date.getMinutes()/5)*5).toString():"0"+(parseInt(date.getMinutes()/5)*5).toString()) +"am"
                            }
                            var date_format_str = (date.getDate().toString().length==2?date.getDate().toString():"0"+date.getDate().toString())+"/"+((date.getMonth()+1).toString().length==2?(date.getMonth()+1).toString():"0"+(date.getMonth()+1).toString())+"/"+date.getFullYear().toString()+" "+time; 
                            var name = item.from.name.charAt(0).toUpperCase()
                            name = name + item.from.name.substring(1)
                            return (
                                <div
                                    key={index}
                                    className={item.read ? "email--card read--bgc" : "email--card unread--bgc"}
                                    onClick={() => {
                                        handleEmailClick(item.id)
                                        setCurrentEmailSubject(item.subject)
                                        setCurrentEmailTime(date_format_str)
                                        setCurrentAvatar(name)
                                        setCurrentId(item.id)
                                        setReadUnread(index)
                                    }}
                                    id={item.id}
                                >
                                    <div
                                        className='user--avatar font--light--white'
                                    >
                                        <p>{item.from.name.charAt(0).toUpperCase()}</p>
                                    </div>
                                    <div className='email--details'>
                                        <p className='email--from--name font--xs-medium-grey'>
                                            From: <span className='font--xs-bold-black'>
                                            {name} &lt;{item.from.email}&gt;
                                            </span>
                                        </p>
                                        <p className='email--subject font--xs-medium-grey'>
                                            Subject: <span className='font--xs-bold-black'>
                                                {item.subject}
                                            </span>
                                        </p>
                                        <p className='email--description font--xs-medium-grey'>
                                            {item.short_description}
                                        </p>

                                        <div className='date--time--fav'>
                                            <p className='email--date--time font--xs-medium-grey mt05'>
                                                {date_format_str}
                                            </p>
                                            {
                                                favButtonRender && 
                                                <p className='font--xs-bold-accent pl1'>Favorite</p>
                                            }
                                        </div>
                                    </div>
                                </div>
                                )
                        })
                    }
                </div>

                {
                    currentEmail &&
                    <div className='flex-7'>
                        <Slave
                            currentEmailBody={currentEmailBody}
                            currentEmailSubject={currentEmailSubject}
                            currentEmailTime={currentEmailTime}
                            currentAvatar={currentAvatar}
                            currentId={currentId}
                            getFavFromSlave={getFavFromSlave}
                        />
                    </div>
                    
                }
            </section>
            }
            
        </>
    )
}
export default Email; 