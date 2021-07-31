import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import InputBase from '@material-ui/core/InputBase';
import { useRecoilState } from 'recoil';
import SearchFor from '../assets/search-icon.png';
import { selectedOptionState, mainSearch } from '../Shared/atoms';

const useStyles = makeStyles(theme => ({
  inputRoot: {
    color: 'inherit',
    fontSize: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const searchImageStyle = {
  marginRight: '10px',
  width: '12%',
  height: '12%',
};

const AutocompleteComponent = ({ data }) => {
  const [search, setSearch] = useRecoilState(mainSearch);
  const classes = useStyles();

  const [value, setValue] = useRecoilState(selectedOptionState);

  const defaultFilterOptions = useMemo(() => {
    if (data) {
      return search
        ? data.slice(0, 5).concat([
            {
              name: `${search}`,
              icon: SearchFor,
              prefix: true,
            },
          ])
        : data.slice(0, 5);
    }
    return [];
  }, [data, search]);

  return (
    <>
      <Autocomplete
        id='controlled-demo'
        size='small'
        value={value}
        onChange={(_, newValue) => {
          setValue(newValue);
        }}
        options={defaultFilterOptions}
        getOptionLabel={option => option.render ?? option.name}
        renderOption={option => (
          <>
            {option.icon && (
              <img src={option.icon} alt='' style={searchImageStyle} />
            )}
            {option.prefix ? `Search for ${option.name}` : option.name}
          </>
        )}
        renderInput={params => {
          const { InputLabelProps, InputProps, ...rest } = params;

          setSearch(rest.inputProps.value);

          return (
            <InputBase
              {...params.InputProps}
              {...rest}
              placeholder='Search by name or tag…'
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
            />
          );
        }}
      />
    </>
  );
};
export default AutocompleteComponent;

AutocompleteComponent.propTypes = {
  data: PropTypes.node,
};

AutocompleteComponent.defaultProps = {
  data: [],
};
