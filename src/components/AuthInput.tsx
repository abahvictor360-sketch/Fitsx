import { Feather } from '@expo/vector-icons';
import { useState, type ComponentRef, type Ref } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View, type TextInputProps } from 'react-native';

import { colors } from '../theme/colors';
import { font } from '../theme/fonts';

type Props = TextInputProps & {
  label: string;
  icon: keyof typeof Feather.glyphMap;
  error?: string;
  secure?: boolean;
  ref?: Ref<ComponentRef<typeof TextInput>>;
};

export function AuthInput({ label, icon, error, secure, style, ref, ...rest }: Props) {
  const [focused, setFocused] = useState(false);
  const [hidden, setHidden] = useState(true);

  return (
    <View style={styles.wrap}>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.field, focused && styles.focused, !!error && styles.errored]}>
        <Feather name={icon} size={18} color={focused ? colors.primary : colors.textMuted} />
        <TextInput
          ref={ref}
          placeholderTextColor="#9AA9A2"
          secureTextEntry={secure && hidden}
          onFocus={(e) => {
            setFocused(true);
            rest.onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            rest.onBlur?.(e);
          }}
          style={[styles.input, style]}
          {...rest}
        />
        {secure && (
          <Pressable hitSlop={10} onPress={() => setHidden((h) => !h)} accessibilityLabel={hidden ? 'Show password' : 'Hide password'}>
            <Feather name={hidden ? 'eye-off' : 'eye'} size={18} color={colors.textMuted} />
          </Pressable>
        )}
      </View>
      {!!error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginBottom: 14 },
  label: { fontFamily: font.medium, fontSize: 13, color: colors.text, marginBottom: 6 },
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    height: 54,
    borderRadius: 16,
    paddingHorizontal: 16,
    backgroundColor: '#F3F8F5',
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  focused: { borderColor: colors.primary, backgroundColor: colors.white },
  errored: { borderColor: colors.danger },
  input: {
    flex: 1,
    minWidth: 0,
    height: '100%',
    fontFamily: font.regular,
    fontSize: 15,
    color: colors.text,
    outlineWidth: 0,
    outlineColor: 'transparent',
  },
  error: { fontFamily: font.regular, fontSize: 12, color: colors.danger, marginTop: 5, marginLeft: 4 },
});
