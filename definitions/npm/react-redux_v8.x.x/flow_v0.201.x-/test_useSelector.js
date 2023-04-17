// @flow

import { describe, it } from 'flow-typed-test';
import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';

type State = {|
  a: number,
|};

describe('useSelector', () => {
  it('passes State as first parameter', () => {
    function Com() {
      // $FlowExpectedError[incompatible-call]
      const count = useSelector<State, number>(state => {
        // $FlowExpectedError[prop-missing]: the state has no `b`
        state.b
      });
      return <div>{count}</div>;
    }
  });

  it('passes type of second parameter as params to `equalityFn`', () => {
    function Com2() {
      const count = useSelector<State, number>(
        state => state.a,
        // $FlowExpectedError[prop-missing]: `equalityFn` is passed params of the second type, do not have `.size`
        (a, b) => a.size === b.size
      );
      return <div>{count}</div>;
    }
  });

  it('returns type of second parameter', () => {
    function Com3() {
      const count = useSelector<State, number>(
        state => state.a,
        (a, b) => a === b
      );
      // `count` is type `number` and allows addition
      return <div>{count + 5}</div>;
    }
  });

  it('can use shallowEqual as the `equalityFn`', () => {
    function Com4() {
      const count = useSelector<State, number>(state => state.a, shallowEqual);
      return <div>{count}</div>;
    }
  });
});
