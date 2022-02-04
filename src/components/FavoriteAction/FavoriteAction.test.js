import { shallow, mount } from 'enzyme';
import { FavoriteAction } from '../index';
import { Button, IconButton, Tooltip } from '@mui/material';

describe('<FavoriteAction/>', () => {
  const trueActionState = {
    actionColor: 'error',
    label: 'Remove from favorites',
  };
  const falseActionState = { label: 'Add to favorites' };
  it.each`
    value    | expected
    ${true}  | ${Button}
    ${false} | ${IconButton}
  `(
    'should render correct action for isButton=$value',
    ({ value, expected }) => {
      const wrapper = shallow(<FavoriteAction isButton={value} />);
      expect(wrapper).toContainMatchingElement(expected);
    },
  );

  it.each`
    value    | expected
    ${true}  | ${trueActionState}
    ${false} | ${falseActionState}
  `(
    'should render correct action for isFavorite=$value',
    ({ value, expected }) => {
      const wrapper = mount(<FavoriteAction isFavorite={value} />);
      expect(wrapper.find(IconButton)).toHaveProp(
        'color',
        expected.actionColor,
      );
      expect(wrapper.find(Tooltip)).toHaveProp('title', expected.label);
    },
  );
});
