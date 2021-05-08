import PropTypes from 'prop-types';

export const Table = ({ children }) => <table>{children}</table>;

Table.propTypes = {
  children: PropTypes.node.isRequired,
};
