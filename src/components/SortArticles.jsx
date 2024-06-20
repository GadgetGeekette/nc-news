import { useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';

const SortArticles = (({setSort}) => {

    const [sortByInput, setSortByInput] = useState('created_at');
    const [orderByInput, setOrderByInput] = useState('desc');

    const handleSortChange = (event) => {
        setSortByInput(event.target.value);
    };

    const handleOrderChange = (event) => {
        setOrderByInput(event.target.value);
    };

    function handleSubmit(event) {
        event.preventDefault();
        setSort({
            sort: {
                sortBy: sortByInput,
                orderBy: orderByInput
            }
        });
    }

    return (<div className='border'>
        <form onSubmit={handleSubmit}>
            <Box sx={{ minWidth: 120 }}>
                <FormControl size="small">
                    <InputLabel id="sort-by">Sort By</InputLabel>
                    <Select labelId="sort-by" id="sort-by" value={sortByInput} label="Sort By" onChange={handleSortChange}>
                        <MenuItem value="created_at">Date</MenuItem>
                        <MenuItem value="comment_count">Comment Count</MenuItem>
                        <MenuItem value="votes">Votes</MenuItem>
                    </Select>
                </FormControl>
                <FormControl size="small">
                    <InputLabel id="order-by">Order By</InputLabel>
                    <Select labelId="order-by" id="order-by" value={orderByInput} label="Order By" onChange={handleOrderChange}>
                        <MenuItem value="desc">Descending</MenuItem>
                        <MenuItem value="asc">Ascending</MenuItem>
                    </Select>
                </FormControl>
                <Button type="submit" variant="contained">Search</Button> 
            </Box>
        </form>
    </div>);
});

export default SortArticles;
