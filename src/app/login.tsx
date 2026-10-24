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

export default function LoginScreen() {
  const { redirect } = useLocalSearchParams<{ redirect?: string }>();
  const { signIn, signInWithProvider, continueAsGuest } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string; form?: string }>({});
  const clearError = (key: keyof typeof errors) => setErrors((e) => ({ ...e, [key]: undefined, form: undefined }));
  const [notice, setNotice] = useState('');
  const [loading, setLoading] = useState(false);
  const passwordRef = useRef<ComponentRef<typeof TextInput>>(null);

  const done = () => router.replace((redirect as '/') || '/');

  const submit = async () => {
    const next: typeof errors = {};
    if (!isValidEmail(email)) next.email = 'Enter a valid email address.';
    if (password.length < 6) next.password = 'Password must be at least 6 characters.';
    setErrors(next);
    setNotice('');
    if (Object.keys(next).length) return;
    setLoading(true);
    try {
      await signIn(email, password);
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

  const forgot = () => {
    if (!isValidEmail(email)) {
      setErrors({ email: 'Enter your email first, then tap “Forgot password?”.' });
      return;
    }
    setErrors({});
    setNotice(`If an account exists for ${email.trim()}, a reset link is on its way.`);
  };

  const skip = () => {
    continueAsGuest();
    router.replace('/');
  };

  return (
    <AuthLayout
      title="Welcome back 👋"
      subtitle="Sign in to continue shopping"
      topLeft={
        redirect ? (
          <IconButton label="Back" onPress={() => (router.canGoBack() ? router.back() : router.replace('/'))}>
            <Feather name="chevron-left" size={22} color={colors.text} />
          </IconButton>
        ) : null
      }
      topRight={
        redirect ? null : (
          <Pressable onPress={skip} hitSlop={10} style={styles.skip}>
            <Text style={styles.skipText}>Skip</Text>
          </Pressable>
        )
      }
    >
      {!!errors.form && (
        <View style={styles.banner}>
          <Feather name="alert-circle" size={16} color={colors.danger} />
          <Text style={styles.bannerText}>{errors.form}</Text>
        </View>
      )}
      <AuthInput
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
        placeholder="Your password"
        value={password}
        onChangeText={(v) => {
          setPassword(v);
          clearError('password');
        }}
        error={errors.password}
        secure
        autoComplete="password"
        textContentType="password"
        returnKeyType="go"
        onSubmitEditing={submit}
      />
      <Text style={styles.forgot} onPress={forgot}>
        Forgot password?
      </Text>
      {!!notice && <Text style={styles.notice}>{notice}</Text>}

      <PrimaryButton label="Sign In" onPress={submit} loading={loading} />
      <SocialButtons onPress={social} disabled={loading} />

      <Text style={styles.footer}>
        Don’t have an account?{' '}
        <Text style={styles.link} onPress={() => router.replace({ pathname: '/signup', params: redirect ? { redirect } : {} })}>
          Sign Up
        </Text>
      </Text>
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  skip: { backgroundColor: colors.white, paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20 },
  skipText: { fontFamily: font.semibold, fontSize: 13, color: colors.primary },
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
  forgot: { alignSelf: 'flex-end', fontFamily: font.medium, fontSize: 13, color: colors.primary, marginTop: -2, marginBottom: 10 },
  notice: { fontFamily: font.regular, fontSize: 12.5, color: colors.primary, backgroundColor: colors.mint, padding: 10, borderRadius: 12, marginBottom: 8 },
  footer: { fontFamily: font.regular, fontSize: 14, color: colors.textMuted, textAlign: 'center', marginTop: 26 },
  link: { fontFamily: font.semibold, color: colors.primary },
});
