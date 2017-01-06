// @flow
import React from 'karet';
import cx from 'classnames';

const getButtonClass = (type = 'primary') => `btn-${type}`;

export const Button = ({ type = 'default', text, ...props }: *) =>
  <button className={cx('btn', getButtonClass(type))} {...props}>{text}</button>;

export const LinkButton = ({ ...props }: *) => <Button type="link" {...props} />;

export const PrimaryButton = ({ ...props }: *) => <Button type="primary" {...props} />;

export const SecondaryButton = ({ ...props }: *) => <Button type="secondary" {...props} />;

export const SuccessButton = ({ ...props }: *) => <Button type="success" {...props} />;

export const InfoButton = ({ ...props }: *) => <Button type="info" {...props} />;

export const WarningButton = ({ ...props }: *) => <Button type="warning" {...props} />;

export const DangerButton = ({ ...props }: *) => <Button type="danger" {...props} />;
