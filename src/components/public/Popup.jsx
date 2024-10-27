import { Snackbar } from "@mui/material"
import { useState } from "react";

function Popup(props) {
    const [state, setState] = useState({
        open: props.aberto,
        vertical: 'top',
        horizontal: 'center',
    });
    const { vertical, horizontal, open } = state;

    // const handleClick = (newState) => () => {
    //     setState({ ...newState, open: true });
    // };

    const handleClose = () => {
        setState({ ...state, open: false })
    };
    return(
        <Snackbar
            className="popup"
            anchorOrigin={{ vertical, horizontal }}
            open={open}
            onClose={handleClose}
            message={props.mensagem}
            key={vertical + horizontal}
        />
    )
}
export default Popup