import React, { useContext, useEffect, useState } from 'react'
import CreateRoundedIcon from '@mui/icons-material/CreateRounded';
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import { Button, Card, Container, ListGroup, Modal } from 'react-bootstrap'
import { Button as BTN, Box, Avatar, FormControl, FormLabel, Select, FormErrorMessage, Input, useToast, Badge } from '@chakra-ui/react'
import { useForm } from "react-hook-form";
import { addPostResolver } from "../../utils/validator/addPostResolver";
import { AuthContext } from '../../components/Authentication/AuthProvider';
import { DataContext } from '../../components/Authentication/DataProvider';
import Loader from '../../components/Loader';
import { db } from '../../utils/firebase';

const Community = () => {
    const { user } = useContext(AuthContext);
    const { groups, users, requestGroups, setRequestGroups } = useContext(DataContext);
    const [posts, setPosts] = useState([]);
    const [requestPosts, setRequestPosts] = useState(false);
    const [showAdd, setShowAdd] = useState(false);
    const [loading, setLoading] = useState(true);
    const toast = useToast();
    const handleClose = () => setShowAdd(false);
    const handleShowAdd = () => setShowAdd(true);
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm({ resolver: addPostResolver });

    useEffect(() => {
        const temp = [];
        const groupIds = []
        groups.forEach(grp => groupIds.push(grp.id))
        db.collection("posts")
            .where("groupId", "in", [...groupIds, "public"])
            .get()
            .then((data) => {
                data.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    temp.push({ id: doc.id, data: doc.data() });
                });
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            })
            .finally(() => {
                setPosts(temp)
                // console.log(temp);
                setLoading(false)
            });
    }, [user, requestPosts, groups]);
    const addPost = ({ group, msg, image }) => {
        let groupData;
        if (group !== 'public') {
            groups.forEach(grp => {
                if (grp.id === group) {
                    groupData = grp;
                }
            });
        } else {
            groupData = {
                id: 'public',
                data: {
                    title: 'Public',
                }
            }
        }

        const finalDoc = {
            groupId: groupData.id,
            groupTitle: groupData.data.title,
            authorId: user.uid,
            message: msg,
            imageLink: image,
        }
        db.collection("posts").add(finalDoc)
            .then((ref) => {
                toast({
                    title: 'top-right toast',
                    position: 'top-right',
                    isClosable: true,
                    render: () => (
                        <Box color='white' p={3} bg='blue.500'>
                            Post uploaded successfully!!
                        </Box>
                    ),
                })
                console.log("Document successfully written!", ref.id, ref.data);
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
            })
            .finally(() => {
                handleClose()
                setRequestGroups(!requestGroups);
                setRequestPosts(!requestPosts);
                setLoading(false);
            })
    }
    const deletePost = (id) => {
        db.collection("posts").doc(id).delete().then(() => {
            toast({
                title: 'top-right toast',
                position: 'top-right',
                isClosable: true,
                render: () => (
                    <Box color='white' p={3} bg='red.500'>
                        Post deleted successfully!!
                    </Box>
                ),
            })
            setRequestPosts(!requestPosts)
            console.log("Document successfully deleted!");
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
    }
    return (
        <Container style={{ width: '60%' }}>
            {user && Object.keys(users).length !== 0 && (
                <Box style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <Avatar name={users[user.uid].name} />
                    <BTN variant='filled' style={{ width: '90%', borderRadius: '50px', justifyContent: 'flex-start', border: '2px solid gray' }} onClick={handleShowAdd} focusBorderColor='lime' placeholder='Write a post' size='lg'>
                        <CreateRoundedIcon /> Write a post
                    </BTN>
                </Box>

            )}
            <Modal show={showAdd} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create a post</Modal.Title>
                </Modal.Header>
                <form onSubmit={handleSubmit(addPost)}>
                    <Modal.Body>
                        <FormControl isInvalid={errors.group}>
                            <FormLabel htmlFor="group">Select a group</FormLabel>
                            {/* <Input
                                type="text"
                                name="group"
                                placeholder="Select a group"
                                {...register("group")}
                            /> */}
                            <Select isInvalid={errors.group} name='group' placeholder='Select group' {...register("group")} >
                                <option value={'public'}>Public</option>
                                {groups?.map((group) => (
                                    <option key={group.id} value={group.id}>{group.data.title}</option>
                                ))}
                            </Select>
                            <FormErrorMessage>
                                {errors.group && errors.group.message}
                            </FormErrorMessage>
                        </FormControl>

                        <FormControl marginTop="2" isInvalid={errors.msg}>
                            <FormLabel htmlFor="msg">Write your message</FormLabel>
                            <Input
                                type="text"
                                name="msg"
                                placeholder="Add a message"
                                {...register("msg")}
                            />
                            <FormErrorMessage>
                                {errors.msg && errors.msg.message}
                            </FormErrorMessage>
                        </FormControl>
                        <FormControl marginTop="2" isInvalid={errors.image}>
                            <FormLabel htmlFor="image">Add Image Link</FormLabel>
                            <Input
                                type="text"
                                name="image"
                                placeholder="Add Image Link"
                                defaultValue={'na'}
                                {...register("image")}
                            />
                            <FormErrorMessage>
                                {errors.image && errors.image.message}
                            </FormErrorMessage>
                        </FormControl>

                        <Box mt="5" color="red.500">
                            {errors.API_ERROR && errors.API_ERROR.message}
                        </Box>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button type="submit" variant="success">
                            Submit
                        </Button>
                    </Modal.Footer>
                </form>
                {/* <form onSubmit={handleSubmit(addPost)}>
                    <Modal.Body>
                        <Form.Group>
                            <Form.Label>Select a group</Form.Label>
                            <Form.Select isInvalid={errors.group} name='group' aria-label="Default select example" placeholder='Select the group' {...register('group')}>
                                {groups?.map((group) => (
                                    <option key={group.id} value={group.id}>{group.data.title}</option>
                                ))}
                            </Form.Select>
                            <Form.Control.Feedback type='invalid'>{errors.group && errors.group.message}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Write your message</Form.Label>
                            <Form.Control name='msg' isInvalid={errors.msg} as="textarea" rows={3} {...register('msg')} />
                            <Form.Control.Feedback type='invalid'>{errors.msg && errors.msg.message}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="" className="mb-3">
                            <Form.Label>Add Image Link</Form.Label>
                            <Form.Control name='image' placeholder='Add Image' type="text" />
                        </Form.Group>

                        <Box mt="5" color="red.500">
                            {errors.API_ERROR && errors.API_ERROR.message}
                        </Box>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button type="submit" variant="success">
                            Submit
                        </Button>
                    </Modal.Footer>
                </form> */}

            </Modal>

            {loading ? <Loader /> : posts?.map((post) => (
                <Card key={post.id} style={{ width: '100', margin: '10px auto' }}>
                    <Card.Body>
                        {Object.keys(users).length !== 0 && (
                            <Card.Title>
                                {users[post.data.authorId].name}
                                {' '}
                                <Badge borderRadius={'50px'} variant='outline' colorScheme={'green'}>{post.data.groupTitle}</Badge>
                            </Card.Title>
                        )}
                        <Card.Text>
                            {post.data.message}
                        </Card.Text>
                    </Card.Body>
                    {post.data.imageLink !== 'na' && post.data.imageLink !== 'NA' && <Card.Img variant="top" src={post.data.imageLink} />}
                    <Card.Body>
                        <Card.Link as={Button} variant={'primary'} href="#"><ChatBubbleOutlineRoundedIcon /> Comment</Card.Link>
                        <Card.Link as={Button} onClick={() => deletePost(post.id)} variant={'danger'}><DeleteOutlineRoundedIcon /> Delete</Card.Link>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                        {Object.keys(users).length !== 0 && post.data.comments?.map((cmnt, key) => (

                            <ListGroup.Item key={key}><cite>{users[cmnt.senderId].name}</cite> - {cmnt.comment}</ListGroup.Item>
                        ))}
                    </ListGroup>
                </Card>
            ))}

        </Container>
    )
}

export default Community