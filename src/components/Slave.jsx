function Slave({currentEmailBody, currentEmailSubject, currentEmailTime, currentAvatar, currentId, getFavFromSlave}) {


    const  setFavLocal = (id) =>{
        getFavFromSlave(id)
    }

    return (
        <>
            <div className='slave--main'>
                <div className='user--avatar font--light--white'>
                    <p>{currentAvatar.charAt(0)}</p>
                </div>

                <div className='slave--content'>
                    <div className='subject--fav--btn'>
                        <div className='font--xl-medium-black'>
                            {currentEmailSubject}
                        </div>
                        <div className='fav--btn font--light--white' onClick={() => setFavLocal(currentId)}>
                            <p>Mark as Favorite</p>
                        </div>
                    </div>
                    
                    <div className='slave--body'>
                        {currentEmailTime}
                    </div>
                    <div className='slave--body' dangerouslySetInnerHTML={{ __html: currentEmailBody }}></div>
                </div>
            </div>
        
        </>

    )
}


export default Slave; 