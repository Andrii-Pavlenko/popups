import React, { createRef, Fragment } from "react";
import { Button, Popup } from "semantic-ui-react";
import { connect } from "react-redux";

import { saveText, isOpenInput } from "../redux/actions";
import { getInputToShow } from "../redux/selectors";

function AddText({ showInput, isOpen, saveText }) {
  const contextRef = createRef();

  let handleOpen = () =>  {
    isOpen();
  }

  let handleClose = () => {
    let inputValue = contextRef.current.value;
    saveText(inputValue);
    isOpen();
  }

  return (
    <div className="buttonSegment">
      <Fragment>
        <Popup
          trigger={<Button content="Add text" />}
          content={<input ref={contextRef} autoFocus />}
          on="click"
          open={showInput}
          onClose={handleClose}
          onOpen={handleOpen}
          position="bottom left"
          context={contextRef}
          className="input"
        />
      </Fragment>
    </div>
  );
}

export default connect(
  (state) => ({
    showInput: getInputToShow(state),
  }),
  (dispatch) => ({
    saveText: (inputValue) => dispatch(saveText(inputValue)),
    isOpen: () => dispatch(isOpenInput()),
  })
)(AddText);
