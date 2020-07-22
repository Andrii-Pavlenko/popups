import React, { useEffect } from "react";
import { Button, Segment, Popup } from "semantic-ui-react";

import { connect } from "react-redux";

import { loadTexts, isOpenPopup } from "../redux/actions";
import {
  getTexts,
  getPopupToShow,
  getTextSaving,
  getTextSavingError,
  getTextLoading,
  getTextLoadingError,
  getUnautorized,
} from "../redux/selectors";

const ShowText = ({
  isOpen,
  load,
  showPopup,
  texts,
  saving,
  loading,
  savingError,
  loadingError,
  unautorized,
}) => {
  useEffect(() => {
    load();
  }, [load]);

  function handleOpen() {
    isOpen();
    load();
  }

  function handleClose() {
    isOpen();
  }

  function toShow() {
    if (saving && loading) {
      return <Segment loading>Loading...</Segment>;
    } else if (savingError && loadingError) {
      return (
        <Segment inverted color="red">
          Seomething went wrong!
        </Segment>
      );
    } else if (unautorized) {
      return (
        <Segment inverted color="red">
          Unautorized
        </Segment>
      );
    } else if (texts && texts.length) {
      return texts.map((text, i) => (
        <Segment key={i}>{text}</Segment>
      ));
    } else {
      return (
        <Segment inverted color="red">
          No text to show
        </Segment>
      );
    }
  }

  return (
    <div className="buttonSegment">
      <Popup
        trigger={<Button content="Show text" />}
        content={
          <Segment.Group>
            {toShow()}
          </Segment.Group>
        }
        on="click"
        open={showPopup}
        onClose={handleClose}
        onOpen={handleOpen}
        position="right center"
      />
    </div>
  );
};

export default connect(
  (state) => ({
    texts: getTexts(state),
    showPopup: getPopupToShow(state),
    saving: getTextSaving(state),
    savingError: getTextSavingError(state),
    loading: getTextLoading(state),
    loadingError: getTextLoadingError(state),
    unautorized: getUnautorized(state),
  }),
  (dispatch) => ({
    load: () => dispatch(loadTexts()),
    isOpen: () => dispatch(isOpenPopup()),
  })
)(ShowText);
