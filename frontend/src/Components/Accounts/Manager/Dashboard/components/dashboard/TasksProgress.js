import React from 'react';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  LinearProgress,
  Typography,
} from '@material-ui/core';
import { orange } from '@material-ui/core/colors';
import InsertChartIcon from '@material-ui/icons/InsertChartOutlined';

const TasksProgress = props => (
  <Card style={{ height: '100%', position: 'relative' }} {...props}>
    <CardContent>
      <Grid container spacing={3} style={{ justifyContent: 'space-between' }}>
        <Grid item>
          <Typography color='textSecondary' gutterBottom variant='h6'>
            TASKS PROGRESS
          </Typography>
          <Typography color='textPrimary' variant='h3'>
            75.5%
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            style={{
              backgroundColor: orange[600],
            }}>
            <InsertChartIcon />
          </Avatar>
        </Grid>
      </Grid>
      <Box pt={3}>
        <LinearProgress value={75.5} variant='determinate' />
      </Box>
    </CardContent>
  </Card>
);

export default TasksProgress;
