import { Feather } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useRef, useState, type ComponentRef } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { PrimaryButton, SocialButtons } from '../components/AuthButtons';
import { AuthInput } from '../components/AuthInput';
import { AuthLayout } from '../components/AuthLayout';
import { IconButton } from '../components/IconButton';
import { isValidEmail, useAuth } from '../store/AuthContext';
import { colors } from '../theme/colors';
import { font } from '../theme/fonts';

type Errors = { name?: string; email?: string; password?: string; confirm?: string; terms?: string; form?: string };

export default function SignUpScreen() {
  const { redirect } = useLocalSearchParams<{ redirect?: string }>();
  const { signUp, signInWithProvider } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const clearError = (key: keyof typeof errors) => setErrors((e) => ({ ...e, [key]: undefined, form: undefined }));
  const [loading, setLoading] = useState(false);
  const emailRef = useRef<ComponentRef<typeof TextInput>>(null);
  const passwordRef = useRef<ComponentRef<typeof TextInput>>(null);
  const confirmRef = useRef<ComponentRef<typeof TextInput>>(null);

  const done = () => router.replace((redirect as '/') || '/');
  const toLogin = () => router.replace({ pathname: '/login', params: redirect ? { redirect } : {} });

  const submit = async () => {
    const next: Errors = {};
    if (name.trim().length < 2) next.name = 'Please enter your full name.';
    if (!isValidEmail(email)) next.email = 'Enter a valid email address.';
    if (password.length < 6) next.password = 'Use at least 6 characters.';
    if (confirm !== password || !confirm) next.confirm = 'Passwords don’t match.';
    if (!agreed) next.terms = 'Please accept the Terms & Privacy Policy.';
    setErrors(next);
    if (Object.keys(next).length) return;
    setLoading(true);
    try {
      await signUp(name, email, password);
      done();
    } catch (e) {
      setErrors({ form: (e as Error).message });
    } finally {
      setLoading(false);
    }
  };

  const social = async (p: 'google' | 'apple') => {
    setLoading(true);
    await signInWithProvider(p);
    setLoading(false);
    done();
  };

  const strength = password.length === 0 ? 0 : password.length < 6 ? 1 : /[A-Z]/.test(password) && /\d/.test(password) && password.length >= 8 ? 3 : 2;

  return (
    <AuthLayout
      compact
      title="Create account"
      subtitle="Join fitsx and find your perfect pair"
      topLeft={
        <IconButton label="Back" onPress={toLogin}>
          <Feather name="chevron-left" size={22} color={colors.text} />
        </IconButton>
      }
    >
      {!!errors.form && (
        <View style={styles.banner}>
          <Feather name="alert-circle" size={16} color={colors.danger} />
          <Text style={styles.bannerText}>{errors.form}</Text>
        </View>
      )}
      <AuthInput
        label="Full name"
        icon="user"
        placeholder="Jane Doe"
        value={name}
        onChangeText={(v) => {
          setName(v);
          clearError('name');
        }}
        error={errors.name}
        autoCapitalize="words"
        autoComplete="name"
        textContentType="name"
        returnKeyType="next"
        onSubmitEditing={() => emailRef.current?.focus()}
      />
      <AuthInput
        ref={emailRef}
        label="Email"
        icon="mail"
        placeholder="you@example.com"
        value={email}
        onChangeText={(v) => {
          setEmail(v);
          clearError('email');
        }}
        error={errors.email}
        keyboardType="email-address"
        autoCapitalize="none"
        autoComplete="email"
        textContentType="emailAddress"
        returnKeyType="next"
        onSubmitEditing={() => passwordRef.current?.focus()}
      />
      <AuthInput
        ref={passwordRef}
        label="Password"
        icon="lock"
        placeholder="At least 6 characters"
        value={password}
        onChangeText={(v) => {
          setPassword(v);
          clearError('password');
        }}
        error={errors.password}
        secure
        autoComplete="new-password"
        textContentType="newPassword"
        returnKeyType="next"
        onSubmitEditing={() => confirmRef.current?.focus()}
      />
      {password.length > 0 && (
        <View style={styles.strengthRow}>
          {[1, 2, 3].map((i) => (
            <View
              key={i}
              style={[styles.strengthBar, i <= strength && { backgroundColor: ['', colors.danger, '#E8A33D', colors.star][strength] }]}
            />
          ))}
          <Text style={styles.strengthText}>{['', 'Weak', 'Good', 'Strong'][strength]}</Text>
        </View>
      )}
      <AuthInput
        ref={confirmRef}
        label="Confirm password"
        icon="lock"
        placeholder="Repeat your password"
        value={confirm}
        onChangeText={(v) => {
          setConfirm(v);
          clearError('confirm');
        }}
        error={errors.confirm}
        secure
        autoComplete="new-password"
        textContentType="newPassword"
        returnKeyType="go"
        onSubmitEditing={submit}
      />

      <Pressable style={styles.terms} onPress={() => {
          setAgreed((a) => !a);
          clearError('terms');
        }} accessibilityRole="checkbox" accessibilityState={{ checked: agreed }}>
        <View style={[styles.box, agreed && styles.boxOn, !!errors.terms && !agreed && { borderColor: colors.danger }]}>
          {agreed && <Feather name="check" size={14} color={colors.white} />}
        </View>
        <Text style={styles.termsText}>
          I agree to the <Text style={styles.link}>Terms of Service</Text> and <Text style={styles.link}>Privacy Policy</Text>
        </Text>
      </Pressable>
      {!!errors.terms && !agreed && <Text style={styles.termsError}>{errors.terms}</Text>}

      <PrimaryButton label="Create Account" onPress={submit} loading={loading} />
      <SocialButtons onPress={social} disabled={loading} />

      <Text style={styles.footer}>
        Already have an account?{' '}
        <Text style={styles.link} onPress={toLogin}>
          Sign In
        </Text>
      </Text>
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#FDECEC',
    borderRadius: 12,
    padding: 12,
    marginBottom: 14,
  },
  bannerText: { flex: 1, fontFamily: font.medium, fontSize: 13, color: colors.danger },
  strengthRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: -6, marginBottom: 14 },
  strengthBar: { flex: 1, height: 4, borderRadius: 2, backgroundColor: colors.border },
  strengthText: { fontFamily: font.medium, fontSize: 11, color: colors.textMuted, width: 46, textAlign: 'right' },
  terms: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 4, marginBottom: 6 },
  box: {
    width: 22,
    height: 22,
    borderRadius: 7,
    borderWidth: 1.5,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxOn: { backgroundColor: colors.primary, borderColor: colors.primary },
  termsText: { flex: 1, fontFamily: font.regular, fontSize: 13, color: colors.textMuted, lineHeight: 19 },
  termsError: { fontFamily: font.regular, fontSize: 12, color: colors.danger, marginLeft: 32, marginBottom: 4 },
  footer: { fontFamily: font.regular, fontSize: 14, color: colors.textMuted, textAlign: 'center', marginTop: 26 },
  link: { fontFamily: font.semibold, color: colors.primary },
});
