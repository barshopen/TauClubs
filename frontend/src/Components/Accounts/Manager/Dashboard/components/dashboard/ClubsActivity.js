import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Bar } from 'react-chartjs-2';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  useTheme,
  colors,
} from '@material-ui/core';

const ClubsActivity = ({ usersByDated }) => {
  const theme = useTheme();
  const values = useState(usersByDated);

  const labels = useMemo(() => {
    const monthArray = [];

    for (let i = 0; i < 6; i += 1) {
      const monthName = moment()
        .subtract(i, 'month')
        .startOf('month')
        .format('MMMM');
      monthArray.push(monthName);
    }
    return monthArray.reverse();
  }, []);

  const data = {
    datasets: [
      {
        backgroundColor: colors.indigo[500],
        data: Object.values(values).map(value => value),
        label: 'Users joined',
      },
    ],
    labels,
  };

  const options = {
    animation: true,
    cornerRadius: 20,
    layout: { padding: 0 },
    legend: { display: false },
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      xAxes: [
        {
          barThickness: 20,
          maxBarThickness: 20,
          barPercentage: 0.5,
          categoryPercentage: 0.5,
          ticks: {
            fontColor: theme.palette.text.secondary,
          },
          gridLines: {
            display: true,
            drawBorder: true,
          },
        },
      ],
      yAxes: [
        {
          ticks: {
            fontColor: theme.palette.text.secondary,
            beginAtZero: true,
            min: 0,
          },
          gridLines: {
            borderDash: [2],
            borderDashOffset: [2],
            color: theme.palette.divider,
            drawBorder: true,
            zeroLineBorderDash: [2],
            zeroLineBorderDashOffset: [2],
            zeroLineColor: theme.palette.divider,
          },
        },
      ],
    },
    tooltips: {
      backgroundColor: theme.palette.background.paper,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary,
    },
  };

  return (
    <Card>
      <CardHeader title='Clubs Users Activity' />
      <Divider />
      <CardContent>
        <Box
          style={{
            height: 400,
            position: 'relative',
          }}>
          <Bar data={data} options={options} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default ClubsActivity;

ClubsActivity.propTypes = {
  usersByDated: PropTypes.node,
};

ClubsActivity.defaultProps = {
  usersByDated: {},
};
