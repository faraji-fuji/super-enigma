import { useState, useEffect } from 'react';
import Display from './Display';
import CustomButton from './CustomButton';
import Register from './Register';
import Logout from './Logout';
import axios from 'axios';
import "./CashRegister.css"

export default function CashRegister({ authToken, handleAuthentication }) {
    const [displayContent, setDisplayContent] = useState("");
    const [registerEntries, setRegisterEntries] = useState([]);
    const [retrieve, setRetrieve] = useState(false);
    const apiUrl = process.env.REACT_APP_API_URL;
    const headers = { Authorization: `Token ${authToken}` }

    const fetchData = async () => {
        axios.get(`${apiUrl}/entries/`, { headers })
            .then((response) => {
                setRegisterEntries(response.data);
            })
            .catch((error) => {
                console.log(error.response.status)

                if (error.response.status === 401) {
                    sessionStorage.clear()
                    handleAuthentication()
                }
            })
        console.log("fetching entries..")
    };

    // fetch entries when retrieve changes
    useEffect(() => {
        fetchData();
    }, [retrieve]);

    const handleButtonClick = (value) => {
        // regex to check for decimal places and periods in the input
        const decimalRegexCheck = new RegExp(/^\d*\.\d{3,}$/)
        const periodRegexCheck = new RegExp(/\./)
        let newDisplayContent = "";

        switch (value) {
            case "DEL":
                // check if display content is empty
                if (!displayContent) {
                    break;
                }

                // remove last character from display content
                newDisplayContent = displayContent.slice(0, -1);
                setDisplayContent(newDisplayContent)
                break;

            case "ADD":
                // check if display is empty
                if (!displayContent) {
                    break;
                }

                // send the new entry to the database
                axios.post(`${apiUrl}/entries/`, { value: displayContent }, { headers })
                    .then((response) => {
                        console.log(response);

                        // trigger fetching new entries
                        setRetrieve(!retrieve)
                    })
                    .catch((error) => {
                        console.log(error);

                        // handle authentication if unauthorized
                        if (error.response.status === 401) {
                            sessionStorage.clear()
                            handleAuthentication()
                        }
                    })

                // reset display
                newDisplayContent = "";
                setDisplayContent(newDisplayContent);
                break;

            case ".":
                // check if period is in the display
                if (periodRegexCheck.test(displayContent)) {
                    break;
                }

                // update display content
                newDisplayContent = displayContent + value
                setDisplayContent(newDisplayContent)
                break;

            default:
                //  check leading zeros
                if (value === "0" && displayContent === "") {
                    break;
                }

                // check if display content is greater than 1,000,000
                if (parseFloat(displayContent + value) > 1000000) {
                    break;
                }

                // check for more than two decimal places
                if (decimalRegexCheck.test(displayContent + value)) {
                    break;
                }

                // update display content
                newDisplayContent = displayContent + value
                setDisplayContent(newDisplayContent)
        }
    }

    const handleLogoutClick = () => {
        axios.post(`${apiUrl}/logout/`, {}, { headers })
            .then((response) => {
                console.log("Logged out")
            })
            .catch((error) => {
                console.log(error)
            })
            .finally(() => {
                sessionStorage.clear();
                handleAuthentication();
            })
    }

    return (
        <div className='container'>

            <Display displayContent={displayContent} />

            <div className='flex-item'>
                <div className='btn-group'>
                    <CustomButton value={"1"} handleButtonClick={() => handleButtonClick("1")} />
                    <CustomButton value={"2"} handleButtonClick={() => handleButtonClick("2")} />
                    <CustomButton value={"3"} handleButtonClick={() => handleButtonClick("3")} />
                </div>

                <div className='btn-group'>
                    <CustomButton value={"4"} handleButtonClick={() => handleButtonClick("4")} />
                    <CustomButton value={"5"} handleButtonClick={() => handleButtonClick("5")} />
                    <CustomButton value={"6"} handleButtonClick={() => handleButtonClick("6")} />
                </div>

                <div className='btn-group'>
                    <CustomButton value={"7"} handleButtonClick={() => handleButtonClick("7")} />
                    <CustomButton value={"8"} handleButtonClick={() => handleButtonClick("8")} />
                    <CustomButton value={"9"} handleButtonClick={() => handleButtonClick("9")} />
                </div>

                <div className='btn-group'>
                    <CustomButton value={"DEL"} handleButtonClick={() => handleButtonClick("DEL")} />
                    <CustomButton value={"0"} handleButtonClick={() => handleButtonClick("0")} />
                    {/* period button to simplify adding cents */}
                    <CustomButton value={"."} handleButtonClick={() => handleButtonClick(".")} />
                </div>

                <div className='btn-group'>
                    <CustomButton value={"ADD"} handleButtonClick={() => handleButtonClick("ADD")} />
                </div>
            </div>

            <Register registerEntries={registerEntries} />
            <Logout authToken={authToken} handleLogoutClick={handleLogoutClick} />
        </div>
    )

}