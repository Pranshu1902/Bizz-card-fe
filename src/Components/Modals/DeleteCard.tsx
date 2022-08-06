import { Button, CircularProgress } from "@mui/material";
import { useState } from "react";
import { deleteCard } from "../../api/ApiUtils";
import { card } from "../../Common/DataType";

export default function DeleteCard(props: {
  card?: card;
  onCloseCB: () => void;
}) {
  const [loading, setLoading] = useState(false);

  const deleteCardOnClick = () => {
    setLoading(false);
    props.card &&
      deleteCard(props.card.id).then(() => {
        setLoading(false);
        props.onCloseCB();
      });
  };

  return (
    <div className="p-4">
      <div className="text-2xl flex justify-center gap-4">
        <i className="fa fa-exclamation-triangle text-red-500 flex items-center text-4xl"></i>
        <p>
          Are you sure you want to delete card:{" "}
          <b>{props.card && props.card.name}</b>?
        </p>
      </div>
      {loading ? (
        <div>
          <CircularProgress color="secondary" />
        </div>
      ) : (
        <div className="flex flex-col md:flex-row justify-between gap-4 pt-6">
          <Button
            variant="contained"
            style={{ backgroundColor: "gray" }}
            onClick={() => props.onCloseCB()}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            style={{ backgroundColor: "red" }}
            onClick={() => deleteCardOnClick()}
          >
            Delete
          </Button>
        </div>
      )}
    </div>
  );
}
