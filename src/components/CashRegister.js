import { useState } from 'react';
import Display from './Display';
import CustomButton from './CustomButton';
import Register from './Register';

export default function CashRegister({ authToken }) {
    const [displayContent, setDisplayContent] = useState("");
    const [registerEntries, setRegisterEntries] = useState([]);

    const handleButtonClick = (value) => {
        const decimalRegexCheck = /^\d*\.?\d{3,}$/
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

            case "ADD":
                // check if display is empty
                if (!displayContent) {
                    break;
                }

                // add the current display contents to the register entries 
                let newRegisterEntries = [...registerEntries, displayContent];

                // TODO: send the new entry to the database

                // update register entries
                setRegisterEntries(newRegisterEntries)

                // reset display
                newDisplayContent = "";
                setDisplayContent(newDisplayContent);

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


    return (
        <div>
            <h1>Cash Register</h1>

            <Display displayContent={displayContent} />

            <CustomButton value={"1"} handleButtonClick={() => handleButtonClick("1")} />
            <CustomButton value={"2"} handleButtonClick={() => handleButtonClick("2")} />
            <CustomButton value={"3"} handleButtonClick={() => handleButtonClick("3")} />
            <CustomButton value={"4"} handleButtonClick={() => handleButtonClick("4")} />
            <CustomButton value={"5"} handleButtonClick={() => handleButtonClick("5")} />
            <CustomButton value={"6"} handleButtonClick={() => handleButtonClick("6")} />
            <CustomButton value={"7"} handleButtonClick={() => handleButtonClick("7")} />
            <CustomButton value={"8"} handleButtonClick={() => handleButtonClick("8")} />
            <CustomButton value={"9"} handleButtonClick={() => handleButtonClick("9")} />
            <CustomButton value={"DEL"} handleButtonClick={() => handleButtonClick("DEL")} />
            <CustomButton value={"0"} handleButtonClick={() => handleButtonClick("0")} />
            {/* period button to simplify adding cents */}
            <CustomButton value={"."} handleButtonClick={() => handleButtonClick(".")} />
            <CustomButton value={"ADD"} handleButtonClick={() => handleButtonClick("ADD")} />

            <Register registerEntries={registerEntries} />

        </div>
    )

}