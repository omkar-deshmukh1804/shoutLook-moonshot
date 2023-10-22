import { useEffect, useState } from "react";


function Filter({ favEmail,toogleMainScreen, email}) {
    const [favEmailList, setFavEmailList] = useState()
    const [readEmailList, setReadEmailList] = useState([])
    console.log(readEmailList)

    useEffect(() => {
        setFavEmailList(favEmail)
    }, [favEmail]);

    useEffect(() => {
        setReadEmailList(email.filter((item) => {
            return item.read
        }))
        
        

        console.log(readEmailList)
    }, [email]);
    const [clickStatus, setClickStatus] = useState(false)
    const [clickStatusRead, setClickStatusRead] = useState(false)


    const sendStatus = (stat) => {
        toogleMainScreen(stat)
    }

        return (
            <>
                <section className="filter--main font--medium--black">
                    <p className="filter--text filter--by">Filter By:</p>
                    <p className="filter--text">Unread</p>
                    <p className="filter--text" onClick={() => {
                        setClickStatusRead(!clickStatusRead)
                    }}>Read</p>
                    <p className="filter--text favorite--button"
                    onClick={() => {
                            setClickStatus(!clickStatus)
                            sendStatus(!clickStatus)
                        }}
                    >Favorites</p>
                </section>
                {
                    clickStatus && <section className="email--main">
                    <div className="email--container">
                        {
                            favEmailList.map((item, index) => {
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
                                        className='email--card'
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
                                                <p className='font--xs-bold-accent pl1'>Favorite</p>
                                            </div>
                                        </div>
                                    </div>
                                    )
                            })
                        }
                    </div>
                </section>
                }

                {
                    clickStatusRead && <section className="email--main">
                    <div className="email--container">
                        {
                            readEmailList.map((item, index) => {
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
                                        className='email--card'
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
                                                <p className='font--xs-bold-accent pl1'>Favorite</p>
                                            </div>
                                        </div>
                                    </div>
                                    )
                            })
                        }
                    </div>
                </section>
                }
                
            </>
        )
}
   

export default Filter;