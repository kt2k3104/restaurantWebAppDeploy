import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Restaurant.css";
import {
  faLocationDot,
  faUser,
  faUtensils,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import AuthContext from "../../contexts/authContext";
import RestaurantContext from "../../contexts/restaurantContext";
import showToastMessage from "../../helpers/toastMessaage";
import ReactModal from "react-modal";

function Restaurant({ rest, ShowEdit }) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const navigation = useNavigate();
  const authCtx = useContext(AuthContext);
  const restCtx = useContext(RestaurantContext);
  const handleEdit = () => {
    navigation("/new", {
      state: {
        rest: rest,
      },
    });
  };

  const handleDelete = async () => {
    try {
      await restCtx.deleteRestaurant(rest.restId, rest.filenameRef);
      restCtx.getDataFirebase();
      showToastMessage("Delete thanh cong", "success");
      navigation("/");
    } catch (err) {
      console.log(err);
    }
  };
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      padding: 0,
      borderRadius: 25,
    },
  };
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div className="res">
      {ShowEdit && (
        <button
          className={
            authCtx.userName === rest.userName
              ? "res-delete"
              : "res-delete disable"
          }
          onClick={handleDelete}
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>
      )}
      <div className="res-header">
        <FontAwesomeIcon icon={faUtensils} />
        <h2>{rest.name}</h2>
      </div>
      <div className="res-image" onClick={openModal}>
        <img src={rest.imageUrl} alt="img" />
      </div>
      <div className="res-info">
        <button className="info-btn">
          <FontAwesomeIcon icon={faUser} />
          <h4>{rest.userName}</h4>
        </button>
        <div>
          <button className="detail-btn" onClick={openModal}>
            Detail
          </button>
          {ShowEdit && (
            <button
              className={
                authCtx.userName === rest.userName
                  ? "edit-btn"
                  : "edit-btn disable"
              }
              onClick={handleEdit}
            >
              Edit
            </button>
          )}
        </div>
      </div>
      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        overlayClassName="Overlay"
        ariaHideApp={false}
      >
        <div className="modal-detail-container">
          <div className="modal-detail-img">
            <img src={rest.imageUrl} alt="img" />
          </div>
          <div className="modal-detail-name">
            <FontAwesomeIcon icon={faUser} />
            <h4>{rest.name}</h4>
          </div>
          <div className="nodal-detail-address">
            <FontAwesomeIcon icon={faLocationDot} />
            <h4>{rest.address}</h4>
          </div>
          <div className="modal-detail-introduction">
            <p>{rest.introduction}</p>
          </div>
          <div className="modal-detail-btn">
            <button onClick={closeModal}>Cancel</button>
          </div>
        </div>
      </ReactModal>
    </div>
  );
}

export default Restaurant;
