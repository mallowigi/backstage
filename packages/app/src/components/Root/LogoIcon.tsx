import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  svg: {
    width: 'auto',
    height: 18,
  },
  cst0: {
    fill: '#FF5F00',
  },
  cst1: {
    fill: '#EB001B',
  },
  cst2: {
    fill: '#F79E1B',
  },
  cst3: {
    fill: '#231F20',
  },
  cst4: {
    fill: '#FFFFFF',
  },
});

const LogoIcon = () => {
  const classes = useStyles();

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 975.8 164.9"
      className={classes.svg}
    >
      <g>
        <g id="XMLID_23_">
          <rect
            x="97.3"
            y="17.6"
            className={classes.cst0}
            width="72.2"
            height="129.7"
          />
          <path
            id="XMLID_35_"
            className={classes.cst1}
            d="M101.9,82.5c0-26.3,12.3-49.7,31.5-64.8c-14-11-31.7-17.6-51-17.6C36.9,0,0,36.9,0,82.5 c0,45.5,36.9,82.5,82.5,82.5c19.2,0,36.9-6.6,51-17.6C114.2,132.2,101.9,108.8,101.9,82.5z"
          />
          <path
            className={classes.cst2}
            d="M266.8,82.5c0,45.5-36.9,82.5-82.5,82.5c-19.2,0-36.9-6.6-51-17.6c19.2-15.1,31.5-38.5,31.5-64.8 s-12.3-49.7-31.5-64.8c14-11,31.7-17.6,51-17.6C229.9,0,266.8,36.9,266.8,82.5z"
          />
          <path
            className={classes.cst2}
            d="M259,133.6v-2.7h1.1v-0.5h-2.7v0.5h1.1v2.7H259z M264.3,133.6v-3.2h-0.8l-1,2.2l-1-2.2h-0.8v3.2h0.6v-2.4 l0.9,2.1h0.6l0.9-2.1v2.4H264.3z"
          />
        </g>
      </g>
    </svg>
  );
};

export default LogoIcon;
