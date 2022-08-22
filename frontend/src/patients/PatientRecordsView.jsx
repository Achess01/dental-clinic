import React, { useEffect, useState } from "react";

// Router
import { useNavigate } from "react-router-dom";

// Components
import { RecordCard } from "../records/RecordCard";
import { Spinner } from "../components/Spinner";
import { SmallContainer } from "../components/Container";
import { AppButtonDark } from "../components/AppButton";

// Api
import { getRecords } from "../config/api";

// Redux
import { useSelector } from "react-redux";

// Router
import { useParams } from "react-router-dom";

export const PatientRecordsView = (props) => {
  const user = useSelector((state) => state.user.user);
  const { id } = useParams();
  const navigate = useNavigate();

  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const doGetRecords = async () => {
      const params = {
        patient: id,
      };
      setLoading(true);
      const response = await getRecords({ token: user.token, params });
      if (!response) {
        return;
      } else {
        setRecords(response);
      }
      setLoading(false);
    };

    doGetRecords();
  }, []);

  const showRecords = () => (
    <>
      {records.length > 0 ? (
        records.map((r, index) => <RecordCard key={index} record={r} />)
      ) : (
        <h1>Empty</h1>
      )}
    </>
  );

  return (
    <SmallContainer>
      <AppButtonDark onClick={(e) => navigate(-1)}>
        <i className="bi bi-door-open">Regresar</i>
      </AppButtonDark>
      <div className="d-flex flex-column justify-content-center align-items-center">{loading ? <Spinner /> : showRecords()}</div>
    </SmallContainer>
  );
};
