import React, { FC } from 'react';
import { Breadcrumb, Layout } from 'antd';
import { IPropsBreadCrumb } from '../../../common/types/personal';

const BreadCrumb: FC<IPropsBreadCrumb> = (props: IPropsBreadCrumb): JSX.Element => {
    const { pathname } = props;
    const path = pathname.split('/');

    // Формируем массив элементов хлебных крошек
    const breadcrumbItems = path.filter(Boolean).map((segment, index) => ({
        title: segment,
        key: index,
    }));

    return (
        <div>
            <Layout>
                <Breadcrumb style={{ margin: '16px 0' }} items={breadcrumbItems} />
            </Layout>
        </div>
    );
};

export default BreadCrumb;
