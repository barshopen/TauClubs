import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
} from '@material-ui/core';
import { useRecoilState } from 'recoil';
import { useMutation } from 'react-query';
import { currentUser } from '../../../Shared/atoms';
import { whoami, updateUserData } from '../../../Shared/api';

const states = [
  {
    value: 'Israel',
    label: 'Israel',
  },
];

const AccountProfileDetails = props => {
  const [user, setUser] = useRecoilState(currentUser);
  const [values, setValues] = useState(user);

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const { mutate: changeUserData } = useMutation(whoami, {
    onSuccess: setUser,
  });

  const submitHandler = async () => {
    await updateUserData(values);
    changeUserData();
  };

  return (
    <form autoComplete='off' noValidate {...props}>
      <Card>
        <CardHeader subheader='The information can be edited' title='Profile' />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                helperText='Please specify first name'
                label='First name'
                name='firstName'
                onChange={handleChange}
                required
                value={values.firstName}
                variant='outlined'
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label='Last name'
                name='lastName'
                onChange={handleChange}
                required
                value={values.lastName}
                variant='outlined'
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                label='Email Address'
                name='email'
                onChange={handleChange}
                required
                disabled
                value={values.email}
                variant='outlined'
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label='Phone Number'
                name='phone'
                onChange={handleChange}
                type='number'
                value={values.phone}
                variant='outlined'
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label='Select Country'
                name='country'
                onChange={handleChange}
                select
                SelectProps={{ native: true }}
                value={values.state}
                variant='outlined'>
                {states.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box display='flex' justifyContent='center' p={2}>
          <Button color='primary' variant='contained' onClick={submitHandler}>
            Save details
          </Button>
        </Box>
      </Card>
    </form>
  );
};

export default AccountProfileDetails;
