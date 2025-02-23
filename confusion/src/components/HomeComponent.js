import React from 'react'
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle } from "reactstrap";
import {Loading} from "./LoadingComponent";
import { baseUrl } from "../shared/baseUrl";
import { FadeTransform } from "react-animation-components";

const RenderCard = ({item, isLoading, errorMsg}) => {
    if(isLoading) {
      return (
          <Loading />
      );
    }
    else if(errorMsg) {
        return (
          <h4>{errorMsg}</h4>
        );
    }
    else
        return (
            <FadeTransform in transformProps={{
                exitTransform: "scale(0.5) translateY(-50%)"
            }}>
                <Card>
                    <CardImg src={baseUrl + item.image} alt={item.name} />
                    <CardBody>
                        <CardTitle>{item.name}</CardTitle>
                        {item.description ? <CardSubtitle>{item.designation}</CardSubtitle>: null}
                        <CardText>{item.description}</CardText>
                    </CardBody>
                </Card>
            </FadeTransform>
        );
}

function Home(props) {
    return (
      <div className="container">
          <div className="row align-items-start">
              <div className="col-12 col-md m-1">
                <RenderCard item={props.dish} isLoading={props.dishesLoading}
                errorMsg={props.dishesErrMsg} />
              </div>
              <div className="col-12 col-md m-1">
                  <RenderCard item={props.promotions} isLoading={props.promosLoading}
                              errorMsg={props.promosErrMsg}/>
              </div>
              <div className="col-12 col-md m-1">
                  <RenderCard item={props.leader} isLoading={props.leadersLoading}
                  errorMsg={props.leadersErrMsg} />
              </div>
          </div>
      </div>
    );
}

export default Home;