import { Container, Title, ProjectContainer, Image,ImagesContainer, Description, DescriptionsContainer, MetaContainer } from './styles'

const projects = [
  {
    title:"Synapse",
    descriptions:["Cillum ex laborum dolore est ut voluptate eu fugiat ad labore in. Aliqua mollit aliqua qui ipsum excepteur duis exercitation. Velit laboris exercitation qui ullamco amet qui dolore laborum ut eu anim deserunt laborum dolor. Elit in Lorem deserunt do. Sunt et dolor laboris sit enim.","Nostrud cillum adipisicing tempor excepteur ad do. In fugiat adipisicing aliqua in laborum fugiat. Nisi veniam ullamco officia proident dolore occaecat incididunt enim deserunt. Occaecat ad cillum culpa dolor fugiat occaecat ullamco veniam consequat laborum culpa ullamco aliquip."],
    images:["https://user-images.githubusercontent.com/41123597/194403562-b21d983e-9898-4a7b-8b5a-d40f879a68ac.png", "https://user-images.githubusercontent.com/41123597/192820816-3c85f659-a69d-498d-9fa9-7cf2551f86bb.jpg"]
  }
  ]

const populate = ()=>{
  const projectContainers = []
  projects.map((project, index)=>projectContainers.push(<ProjectContainer even={index%2 === 0}>
      <Title>{project.title}</Title>
      <ImagesContainer>{project.images.map((image)=><Image src={image}/>)}</ImagesContainer>
      <DescriptionsContainer even={index%2 === 0}>{project.descriptions.map((description)=><Description>{description}</Description>)}</DescriptionsContainer>
    </ProjectContainer>))
    
  return projectContainers
}

export function Projects() {
  return (
    <Container>
      <ProjectContainer even={1%2 === 0}>
        <Title>Project</Title>
        <ImagesContainer>
        <Image src="https://user-images.githubusercontent.com/41123597/194403562-b21d983e-9898-4a7b-8b5a-d40f879a68ac.png"/>
        <Image src="https://user-images.githubusercontent.com/41123597/192820816-3c85f659-a69d-498d-9fa9-7cf2551f86bb.jpg"/>
        <Image src="https://user-images.githubusercontent.com/41123597/192820822-889a1fe2-c265-4e54-846d-6392ee8b2b8a.jpg"/>
        </ImagesContainer>
        <DescriptionsContainer even={1%2 === 0}>
        <Description>Cillum ex laborum dolore est ut voluptate eu fugiat ad labore in. Aliqua mollit aliqua qui ipsum excepteur duis exercitation. Velit laboris exercitation qui ullamco amet qui dolore laborum ut eu anim deserunt laborum dolor. Elit in Lorem deserunt do. Sunt et dolor laboris sit enim.</Description>
        <Description>Nostrud cillum adipisicing tempor excepteur ad do. In fugiat adipisicing aliqua in laborum fugiat. Nisi veniam ullamco officia proident dolore occaecat incididunt enim deserunt. Occaecat ad cillum culpa dolor fugiat occaecat ullamco veniam consequat laborum culpa ullamco aliquip.</Description>
        <Description>Nostrud cillum adipisicing tempor excepteur ad do. In fugiat adipisicing aliqua in laborum fugiat. Nisi veniam ullamco officia proident dolore occaecat incididunt enim deserunt. Occaecat ad cillum culpa dolor fugiat occaecat ullamco veniam consequat laborum culpa ullamco aliquip.</Description>
        <Description>Cillum ex laborum dolore est ut voluptate eu fugiat ad labore in. Aliqua mollit aliqua qui ipsum excepteur duis exercitation. Velit laboris exercitation qui ullamco amet qui dolore laborum ut eu anim deserunt laborum dolor. Elit in Lorem deserunt do. Sunt et dolor laboris sit enim.</Description>
        <Description>Nostrud cillum adipisicing tempor excepteur ad do. In fugiat adipisicing aliqua in laborum fugiat. Nisi veniam ullamco officia proident dolore occaecat incididunt enim deserunt. Occaecat ad cillum culpa dolor fugiat occaecat ullamco veniam consequat laborum culpa ullamco aliquip.</Description>
        <Description>Nostrud cillum adipisicing tempor excepteur ad do. In fugiat adipisicing aliqua in laborum fugiat. Nisi veniam ullamco officia proident dolore occaecat incididunt enim deserunt. Occaecat ad cillum culpa dolor fugiat occaecat ullamco veniam consequat laborum culpa ullamco aliquip.</Description>
        <Description>Cillum ex laborum dolore est ut voluptate eu fugiat ad labore in. Aliqua mollit aliqua qui ipsum excepteur duis exercitation. Velit laboris exercitation qui ullamco amet qui dolore laborum ut eu anim deserunt laborum dolor. Elit in Lorem deserunt do. Sunt et dolor laboris sit enim.</Description>
        <Description>Nostrud cillum adipisicing tempor excepteur ad do. In fugiat adipisicing aliqua in laborum fugiat. Nisi veniam ullamco officia proident dolore occaecat incididunt enim deserunt. Occaecat ad cillum culpa dolor fugiat occaecat ullamco veniam consequat laborum culpa ullamco aliquip.</Description>
        <Description>Nostrud cillum adipisicing tempor excepteur ad do. In fugiat adipisicing aliqua in laborum fugiat. Nisi veniam ullamco officia proident dolore occaecat incididunt enim deserunt. Occaecat ad cillum culpa dolor fugiat occaecat ullamco veniam consequat laborum culpa ullamco aliquip.</Description>
      </DescriptionsContainer>
      </ProjectContainer>
      {populate()}
    </Container>
  )
}
