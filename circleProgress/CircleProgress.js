import React, {useRef, useEffect} from 'react';
import styled from 'styled-components/native';
import {Animated, Text} from 'react-native';

const EMPTY_COLOR = 'rgba(159, 208, 255, 1)';
const PROGRESS_COLOR = '#adff2f';

const CircleBase = styled(Animated.View)`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  border-radius: ${props => props.size / 2}px;
  border-width: ${props => props.size / 10}px;
`;

const EmptyCircle = styled(CircleBase)`
  border-color: ${EMPTY_COLOR};
  justify-content: center;
  align-items: center;
  transform: rotate(-45deg); 
  background-color: #fff;
`;

const TextCircle = styled.Text`
  justify-content: center;
  align-items: center;
  transform: rotate(45deg); 
  font-size:46px;
  font-weight: 600;
`;


const Indicator = styled(CircleBase)`
  position: absolute;
  border-left-color: ${PROGRESS_COLOR};
  border-top-color: ${PROGRESS_COLOR};
  border-right-color: transparent;
  border-bottom-color: transparent; `;

const CoverIndicator = styled(CircleBase)`
  position: absolute;
  border-left-color: ${EMPTY_COLOR};
  border-top-color: ${EMPTY_COLOR};
  border-right-color: transparent;
  border-bottom-color: transparent;
`;

export default function CircleProgress(props) {
  const animatedProgress = useRef(new Animated.Value(0)).current;

  const animateProgress = useRef(toValue => {
    Animated.spring(animatedProgress, {
      toValue,
      useNativeDriver: true,
    }).start();
  }).current;

  useEffect(() => {
    animateProgress(props.progress);
  }, [animateProgress, props.progress]);

  const firstIndicatorRotate = animatedProgress.interpolate({
    inputRange: [0, 50],
    outputRange: ['0deg', '180deg'],
    extrapolate: 'clamp',
  });

  const secondIndicatorRotate = animatedProgress.interpolate({
    inputRange: [0, 100],
    outputRange: ['0deg', '360deg'],
    extrapolate: 'clamp',
  });

  const secondIndictorVisibility = animatedProgress.interpolate({
    inputRange: [0, 49, 50, 100],
    outputRange: [0, 0, 1, 1],
    extrapolate: 'clamp',
  });

  return (
    <EmptyCircle size={props.size}>
      <Indicator
        style={{transform: [{rotate: firstIndicatorRotate}]}}
        size={props.size}
      />
      <CoverIndicator size={props.size} />
      <TextCircle >{props.progress + "%"}</TextCircle>
      <Indicator
        size={props.size}
        style={{
          transform: [{rotate: secondIndicatorRotate}],
          opacity: secondIndictorVisibility,
        }}
      />

    </EmptyCircle>
  );
}