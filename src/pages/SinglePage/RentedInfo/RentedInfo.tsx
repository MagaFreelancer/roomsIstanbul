import React from 'react'
import {
    Flex,
    Progress
} from 'antd'
const RentedInfo = ({ progress }: any) => {
    return (
        <div className="singlepage__rented">
            <h4 className=" singlepage__heading">Данные об арендованном офисе </h4>
            <div className="singlepage__rented-content">
                <Flex gap="small" wrap>
                    {progress.diff === progress.daysCount ?
                        <Progress size="small" type="circle" percent={100} format={() => 'Done'} />
                        :
                        <Progress type="circle" size="small" percent={progress.prec} format={() => `${progress.diff}/${progress.daysCount} Days`} />
                    }
                </Flex>
                <div className="singlepage__rented-price">
                    Сумма: {progress.salePrice} ₺
                </div>
            </div>
        </div>
    )
}

export default RentedInfo