/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import { Cell } from "../Cell";
import { IconEllipsisV } from "../IconEllipsisV";
import { RowCell } from "../RowCell";
import { TextFinishedWrapper } from "../TextFinishedWrapper";
import "./style.css";

export const Row = ({
  className,
  cellRowCellIconEllipsisVIconEllipsisVClassName,
  cellRowCell = <IconEllipsisV className="icon-left-3" />,
  to,
  job,
}) => {
  const { jobTitle, location, seniority, status, delivered, reply, dateCreated } = job;
  const deliveredAsString = delivered.toString();
  const replyAsString = reply.toString();


  return (
    <Link className={`row ${className}`} to={to}>
      {/* <Cell
        className="cell-instance"
        content="checkbox"
        iconLeft={false}
        iconRight={false}
        twoNdText={false}
        type="row"
      /> */}
      <div className="frame-3">
        <Cell
          className="cell-2"
          content="text"
          iconLeft={false}
          iconRight={false}
          rowCellText={jobTitle}
          twoNdText={false}
          type="row"
        />
        <Cell
          className="cell-3"
          content="text"
          iconLeft={false}
          iconRight={false}
          rowCellText={location}
          twoNdText={false}
          type="row"
        />
        <Cell
          className="cell-4"
          content="text"
          iconLeft={false}
          iconRight={false}
          rowCellText={seniority}
          twoNdText={false}
          type="row"
        />
        <div className="row-cell-wrapper">
          <div className="row-cell-3">
            <TextFinishedWrapper className="chip-instance" text={status} />
          </div>
        </div>
        <Cell
          className="cell-5"
          content="text"
          iconLeft={false}
          iconRight={false}
          rowCellDivClassName="design-component-instance-node-2"
          rowCellText={deliveredAsString}
          twoNdText={false}
          type="row"
        />
        <Cell
          className="cell-6"
          content="text"
          iconLeft={false}
          iconRight={false}
          rowCellDivClassName="design-component-instance-node-2"
          rowCellText={replyAsString}
          twoNdText={false}
          type="row"
        />
        <RowCell
          className="row-cell-4"
          divClassName="design-component-instance-node-2"
          hasDiv={false}
          text={dateCreated}
          visible={false}
          visible1={false}
        />
        {/* <Cell
          className="cell-instance"
          content="icon"
          iconLeft={false}
          iconRight={false}
          rowCell={cellRowCell}
          rowCellIconEllipsisVIconEllipsisVClassName={cellRowCellIconEllipsisVIconEllipsisVClassName}
          twoNdText={false}
          type="row"
        /> */}
      </div>
    </Link>
  );
};

Row.propTypes = {
  to: PropTypes.string,
};
