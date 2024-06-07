import React, { FC } from 'react'
import { Breadcrumb, Layout } from 'antd';
import { IPropsBreadCrumb } from '../../../common/types/personal';


const BreadCrumb: FC<IPropsBreadCrumb> = (props: IPropsBreadCrumb): JSX.Element => {
    const { pathname } = props
    const path = pathname.split('/')

    return (
        <div>
            <Layout>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>{path[1]}</Breadcrumb.Item>
                    {path[2] && <Breadcrumb.Item>{path[2]}</Breadcrumb.Item>}
                </Breadcrumb>
            </Layout>
        </div>
    )
}

export default BreadCrumb