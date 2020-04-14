import React from 'react';
import Styled from 'styled-components';
import {ProfileImage} from './ProfileImage';

const UserGridStyled = Styled.div`
   display: grid;
   justify-content: center;
   margin-top: 60px;
   margin-bottom: 60px;
   gap: 20px;
   grid-template-areas: "photo name"
                        "photo label"
                        "photo description"
`           

const Photo = Styled.div`
   grid-area: photo;
   align-self: center
`

const Name = Styled.div`
   grid-area: name;
   font-size: 35px
`

const Label = Styled.div`
   grid-area: label
`

const Description = Styled.div`
   grid-area: description;
   max-width: 400px
`




export default function () {
   return <UserGridStyled>
      <Photo><ProfileImage/></Photo>
      <Name>test2</Name>
      <Label><strong>400 </strong>Followers</Label>
      <Description>Est incididunt ad incididunt et aliqua. Consequat quis id ipsum nulla sint occaecat fugiat eu labore ad nostrud ipsum minim.</Description>
   </UserGridStyled>
}
