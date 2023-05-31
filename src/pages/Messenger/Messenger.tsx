import React, {useEffect, useState} from 'react';
import {useSearchParams} from 'react-router-dom';

import UserService from '../../services/userService';
import PetService from '../../services/petService';
import AdvertService from '../../services/advertService';
import {ChatUserType, useChatContext} from '../../contexts/chatContext';
import {AdCardInfoType, UserInfoType} from '../../components/AdCard/AdCard';
import {withOfferToSignIn} from '../../hoc/withOfferToSignIn';
import {useIsMobileContext} from '../../contexts/isMobileContext';
import {useUserContext} from '../../contexts/userContext';

import TopBar from '../../components/TopBar/TopBar';
import Chat from '../../components/Messenger/Chat/Chat';
import Dialogs from '../../components/Messenger/Dialogs/Dialogs';

import Icons from '../../components/UIKit/Icons';
import Input from '../../components/UIKit/Input';
import Button from '../../components/UIKit/Button';

import styles from './Messenger.module.css';


export const ChatPlug = () =>
    <div className={styles.empty__chat}>
        <Icons icon={'chat-plus-outline'} className={styles.chat__plus__icon}/>
        <h3>Напишите владельцу питомца, чтобы начать общаться</h3>
    </div>;

const Messenger: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const chatID = searchParams.get('chat');

    const {user, setUser} = useUserContext();
    const chat = useChatContext();
    const isMobile = useIsMobileContext();

    const [userInfo, setUserInfo] = useState<UserInfoType>();

    const [transfer, setTransfer] = useState(false);

    const [adverts, setAdverts] = useState<Array<AdCardInfoType>>([]);
    const initialInputState = {value: '', ok: false, edited: false};

    const [advert, setAdvert] = useState(initialInputState);

    useEffect(() => {
        if (user.empty) {
            return;
        }
        AdvertService.getAuthorizedAdverts(user.accessToken, `?userID=${user.userID}&perPage=100`).then(response => {
            switch (response.status) {
                case 200:
                    return response.json();
                default:
                    return null;
            }
        }).then((body: {
            nextPage: string,
            records: Array<AdCardInfoType>,
            totalCount: number, totalPage: number
        }) => {
            if (body) {
                setAdverts(body.records);
            }
        });
    }, [user]);

    const getUser: () => ChatUserType = () => {
        for (let i = 0; i < chat.users.length; i++) {
            if (chat.users[i].userID == chatID) {
                return chat.users[i];
            }
        }
        return {userID: '', connected: false, hasNewMessage: true, username: '', messages: []};
    }
    const [user2, setUser2] = useState<ChatUserType>(getUser());

    useEffect(() => {
        setUser2(getUser());
    }, [chat, chatID]);

    useEffect(() => {
        if (user.empty || !chatID) {
            return;
        }
        UserService.getUserInfoByID(`?chatID=${chatID}`).then(response => {
            //console.log(response);
            switch (response.status) {
                case 200:
                    return response.json();
                default:
                    return null;
            }
        }).then(body => {
            //console.log(body);
            if (body) {
                setUserInfo(body);
            }
        });
    }, [chatID]);

    if (isMobile) {
        return (
            <>
                <TopBar className={styles.top__bar} leftButton={chatID ? 'arrow' : 'burger'}>
                    {!chatID ?
                        <h5>Чаты</h5>
                        :
                        <>
                            {!transfer ?
                                <>
                                    {userInfo && userInfo.chatID != user.chatID && userInfo &&
                                        <img src={userInfo.imageLink} className={styles.user__photo}/>
                                    }
                                    <div className={styles.user__name}>
                                        <h5>{user2.userID == chat.userID ? 'Избранное' : user2.username}</h5>
                                        <p className={'secondary__text-2'}>{user2.userID != chat.userID && (user2.connected ? 'Онлайн' : 'Оффлайн')}</p>
                                    </div>
                                    <Icons icon={'paw'} onClick={() => setTransfer(!transfer)}/>
                                </>
                                :
                                <>
                                    {
                                        userInfo &&
                                        <>
                                            <Input type={'dropdown'} value={advert} setValue={setAdvert}
                                                   className={styles.transfer__input}
                                                   dropdownItems={adverts.map(ad => ad.petName + ', ' + ad.breed)}/>
                                            <Button type={'primary'} color={'orange'} text={'Передать'} onClick={() => {
                                                const petCardID = adverts.find(a => a.petName + ', ' + a.breed == advert.value)?.petCardID;
                                                if (!petCardID) {
                                                    return;
                                                }
                                                console.log(petCardID)
                                                PetService.transferPet({
                                                    petCardID: petCardID,
                                                    newOwnerID: userInfo.userID
                                                }, user.accessToken).then(response => {
                                                    if (response.status == 200) {
                                                        setTransfer(!transfer);
                                                    }
                                                });
                                            }}/>
                                            <Button type={'secondary'} color={'orange'} text={'Отмена'}
                                                    onClick={() => setTransfer(!transfer)}/>
                                        </>
                                    }
                                </>
                            }
                        </>
                    }
                </TopBar>
                <div className={styles.chat__mobile__background}>
                    {chatID ?
                        <Chat chatID={chatID} user2={user2} setUser2={setUser2} getUser={getUser} userInfo={userInfo}
                              advert={advert} setAdvert={setAdvert} adverts={adverts}/>
                        :
                        <Dialogs chatID={chatID}/>
                    }
                </div>
            </>
        );
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.chat__window}>
                <div className={styles.header}>
                    <h1>Чаты</h1>
                </div>
                <div className={styles.chat__wrapper}>
                    <div className={styles.dialogs}>
                        <Dialogs chatID={chatID}/>
                    </div>
                    <div className={styles.dialog}>
                        {chatID ?
                            <Chat chatID={chatID} user2={user2} setUser2={setUser2} getUser={getUser}
                                  userInfo={userInfo} advert={advert} setAdvert={setAdvert} adverts={adverts}/>
                            :
                            <ChatPlug/>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default withOfferToSignIn(Messenger);
