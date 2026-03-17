import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '../../constants/colors';

interface CircularProgressProps {
  progress: number;
  size?: number;
  strokeWidth?: number;
  progressColor?: string;
  backgroundColor?: string;
  children?: React.ReactNode;
}

export const CircularProgress: React.FC<CircularProgressProps> = ({
  progress,
  size = 70,
  strokeWidth = 6,
  progressColor = colors.primary,
  backgroundColor = 'rgba(255, 255, 255, 0.2)',
  children,
}) => {
  const clampedProgress = Math.min(Math.max(progress, 0), 1);
  const degrees = clampedProgress * 360;

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <View
        style={[
          styles.circle,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            borderWidth: strokeWidth,
            borderColor: backgroundColor,
          },
        ]}
      />
      <View
        style={[
          styles.progressContainer,
          { width: size, height: size },
        ]}
      >
        <View
          style={[
            styles.halfCircle,
            {
              width: size / 2,
              height: size,
              borderTopLeftRadius: size / 2,
              borderBottomLeftRadius: size / 2,
              borderWidth: strokeWidth,
              borderRightWidth: 0,
              borderColor: degrees > 180 ? progressColor : 'transparent',
              transform: [{ rotate: degrees > 180 ? `${degrees - 180}deg` : '0deg' }],
              transformOrigin: 'right center',
            },
          ]}
        />
      </View>
      <View
        style={[
          styles.progressContainer,
          { width: size, height: size },
        ]}
      >
        <View
          style={[
            styles.halfCircleRight,
            {
              width: size / 2,
              height: size,
              borderTopRightRadius: size / 2,
              borderBottomRightRadius: size / 2,
              borderWidth: strokeWidth,
              borderLeftWidth: 0,
              borderColor: progressColor,
              transform: [{ rotate: `${Math.min(degrees, 180)}deg` }],
              transformOrigin: 'left center',
            },
          ]}
        />
      </View>
      <View style={styles.content}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  circle: {
    position: 'absolute',
  },
  progressContainer: {
    position: 'absolute',
    overflow: 'hidden',
  },
  halfCircle: {
    position: 'absolute',
    left: 0,
  },
  halfCircleRight: {
    position: 'absolute',
    right: 0,
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
