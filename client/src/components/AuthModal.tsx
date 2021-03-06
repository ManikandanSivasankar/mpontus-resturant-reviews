import {
  DialogActions,
  DialogContent,
  DialogContentText,
  Tab,
  Tabs
} from "@material-ui/core";
import { DialogProps } from "@material-ui/core/Dialog";
import React, { useCallback, useState } from "react";
import SwipeableViews from "react-swipeable-views";
import * as yup from "yup";
import { LoginDto } from "../models/LoginDto";
import { RequestError } from "../models/RequestError";
import { SignupDto } from "../models/SignupDto";
import { AdaptiveModal } from "./AdaptiveModal";
import { Button } from "./Button";
import { Field } from "./Field";
import { Form } from "./Form";
import { Input } from "./Input";

/**
 * Auth Modal Props
 */
interface Props extends DialogProps {
  /**
   * Whether login request is in progress
   */
  loginLoading?: boolean;

  /**
   * Whether signup request is in progress
   */
  signupLoading?: boolean;

  /**
   * Login error
   */
  loginError?: RequestError<LoginDto>;

  /**
   * Signup error
   */
  signupError?: RequestError<SignupDto>;

  /**
   * Login callback
   */
  onLogin: (values: LoginDto) => void;

  /**
   * Signup callback
   */
  onSignup: (values: SignupDto) => void;

  /**
   * Cancel callback
   */
  onCancel: () => void;
}

/**
 * Validation schema for login form
 */
const loginSchema = yup.object<LoginDto>().shape({
  email: yup.string().required(),
  password: yup
    .string()
    .min(6)
    .required()
});

/**
 * Validation schema for signup form
 */
const signupSchema = yup.object<SignupDto>().shape({
  name: yup
    .string()
    .required()
    .trim(),
  email: yup.string().required(),
  password: yup
    .string()
    .min(6)
    .required()
});

/**
 * Auth Modal Component
 *
 * Provides authentication dialog which allows user to login in or
 * sign up with a new account.
 */
export const AuthModal: React.SFC<Props> = ({
  open,
  loginLoading,
  signupLoading,
  loginError,
  signupError,
  onLogin,
  onSignup,
  onCancel,
  onExited
}) => {
  const [tabIndex, setTabIndex] = useState(0);
  const handleChange = useCallback(
    (e: any, index: number) => setTabIndex(index),
    []
  );

  return (
    <AdaptiveModal open={open} onExited={onExited} onClose={onCancel}>
      <Tabs
        fullWidth={true}
        indicatorColor="primary"
        textColor="primary"
        value={tabIndex}
        onChange={handleChange}
      >
        <Tab label={<span id="auth-tab-login">Log In</span>} />
        <Tab label={<span id="auth-tab-signup">Sign Up</span>} />
      </Tabs>
      <SwipeableViews index={tabIndex} onChangeIndex={setTabIndex}>
        <Form
          initialValues={{ email: "", password: "" }}
          validationSchema={loginSchema}
          errors={loginError && loginError.details}
          onSubmit={onLogin}
          aria-labelledby="auth-tab-login"
        >
          <DialogContent>
            <DialogContentText>Log in with existing account</DialogContentText>
            <Field
              component={Input}
              type="email"
              id="login-email"
              name="email"
              label="Email Address"
            />
            <Field
              component={Input}
              type="password"
              id="login-password"
              name="password"
              label="Password"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={onCancel}>Cancel</Button>
            <Button type="submit" color="primary" loading={loginLoading}>
              Login
            </Button>
          </DialogActions>
        </Form>
        <Form
          initialValues={{ name: "", email: "", password: "" }}
          validationSchema={signupSchema}
          errors={signupError && signupError.details}
          onSubmit={onSignup}
          aria-labelledby="auth-tab-signup"
        >
          <DialogContent>
            <DialogContentText>Sign up with a new account</DialogContentText>
            <Field
              component={Input}
              type="text"
              id="signup-name"
              name="name"
              label="Display Name"
            />
            <Field
              component={Input}
              type="email"
              id="signup-email"
              name="email"
              label="Email Address"
            />
            <Field
              component={Input}
              type="password"
              id="signup-password"
              name="password"
              label="Password"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={onCancel}>Cancel</Button>
            <Button type="submit" color="primary" loading={signupLoading}>
              Sign Up
            </Button>
          </DialogActions>
        </Form>
      </SwipeableViews>
    </AdaptiveModal>
  );
};
