import React from 'react';
import axios from 'axios';
import { MenuItem } from './MenuList';

type CheckoutComponentProps = {
    menuItems: MenuItem[];
}

export const CheckoutComponent: React.FC<CheckoutComponentProps> = ({menuItems}: CheckoutComponentProps) => {

    return (
        <div>Checkout component is here</div>
    )
}
