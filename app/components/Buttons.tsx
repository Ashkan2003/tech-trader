import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function BasicButtons() {
  return (
    <Stack spacing={2} direction="row" >
      <Button variant="text" >ایمیل</Button>
      <Button variant="contained">تریدر</Button>
      <Button variant="contained" color='primary'>Outlined</Button>
      <div className='p-4 dark:bg-gray-600'>ddddddd</div>
    </Stack>
  );
}
