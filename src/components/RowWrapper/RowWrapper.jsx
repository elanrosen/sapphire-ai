import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import Checkbox from '@mui/material/Checkbox';
import { IconEllipsisV } from '../IconEllipsisV';
import { Row } from '../Row';
import './style.css';

export const RowWrapper = ({
  setNumSelected,

  headerChecked,
  className,
  rowCellRowCellIconEllipsisVIconEllipsisVClassName,
  rowRowClassName,
  rowCellRowCell = <IconEllipsisV className="icon-left-4" />,
  to,
  job,
  selectedJobIndexes,
  setSelectedJobIndexes,
  jobIndex,
}, ) => {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    // Handle automatic checking/unchecking based on headerChecked prop
    if (headerChecked) {
      setChecked(true);

    } else {
      setChecked(false);
    }
  }, [headerChecked]);

  const handleChange = (event) => {
    const newChecked = event.target.checked;
    setChecked(newChecked);

    // Update numSelected based on the checkbox state
    if (newChecked) {
      setNumSelected((prevNumSelected) => prevNumSelected + 1);
      setSelectedJobIndexes([...selectedJobIndexes, jobIndex]);
      console.log(jobIndex);
      console.log(selectedJobIndexes);


    } else {
      setNumSelected((prevNumSelected) => prevNumSelected - 1);
      setSelectedJobIndexes(selectedJobIndexes.filter(index => index !== jobIndex));

    }
  };

  return (
    <div className={`row-wrapper ${className}`}>
      <Checkbox
        checked={checked}
        onChange={handleChange}
      />
      <Row
        cellRowCell={rowCellRowCell}
        cellRowCellIconEllipsisVIconEllipsisVClassName={rowCellRowCellIconEllipsisVIconEllipsisVClassName}
        className={rowRowClassName}
        to={to}
        job={job}
      />
    </div>
  );
};

RowWrapper.propTypes = {
  to: PropTypes.string,
  setNumSelected: PropTypes.func.isRequired,
  headerChecked: PropTypes.bool.isRequired,
  className: PropTypes.string,
  rowCellRowCellIconEllipsisVIconEllipsisVClassName: PropTypes.string,
  rowRowClassName: PropTypes.string,
  rowCellRowCell: PropTypes.element,
  job: PropTypes.object.isRequired,
};
