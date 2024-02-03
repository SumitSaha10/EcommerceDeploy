import React, { useState, useEffect } from 'react'
import { Textarea, useToast } from '@chakra-ui/react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
} from '@chakra-ui/react'

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Input, FormControl, FormLabel, useDisclosure
} from '@chakra-ui/react'

import { Button } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { HashLoader } from 'react-spinners';



const AdminCreateProduct = () => {
    const navigate = useNavigate()
    useEffect(() => {
        //Get all the products 
        if (!localStorage.getItem("authtokenadmin")) {
            navigate("/adminlogin")
        }
        getallProducts()
    }, [1])

    const [loading, setLoading] = useState(false)
    const { isOpen: formFunctionIsOpen, onOpen: formFunctionOpen, onClose: formFunctionClose } = useDisclosure()
    const { isOpen: confirmIsOpen, onOpen: confirmOpen, onClose: confirmClose } = useDisclosure()

    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)
    const toast = useToast()

    //States for creating product
    const [image, setImage] = useState("");
    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");

    const [products, setProducts] = useState([])

    //States for updating product
    const [updateProductId, setUpdateProductId] = useState("")
    const [updateName, setUpdateName] = useState("");
    const [updateQuantity, setUpdateQuantity] = useState(0);
    const [updatePrice, setUpdatePrice] = useState(0);
    const [updateDescription, setUpdateDescription] = useState("");

    //Func to get all the products from the database
    const getallProducts = async () => {
        try {
            setLoading(true)
            const response = await fetch(`${window.location.origin}/api/admin90/getallproductsstock`, {
                method: 'GET',

            });
            const json = await response.json()
            setProducts(json)
            setLoading(false)
        } catch (error) {
            alert("Failed to fetch ")
        }
    }

    //Function to show the toast
    const showToast = (title, description, duration, isClosable, status, position) => {
        toast({
            title: title,
            description: description,
            duration: duration,
            isClosable: isClosable,
            status: status,
            position: position

        })
    }



    //Function to convert image to base64
    const convertImageToBase64 = (e) => {

        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            //Base 64 encoded string

            setImage(reader.result)
        }
        reader.onerror = (error) => {
            alert("Some error occured")
        }
    }


    //Function to create product
    const createProduct = async (e) => {

        try {
            const response = await fetch(`${window.location.origin}/api/admin90/create-admin-product`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ productImage: image, productName: name, productQuantity: quantity, productPrice: price, productDescription: description })
            })
            await response.json()
            showToast("Product Created Successfully", "Your Product Created Successfully", 3000, true, "success", 'top')
            navigate("/admincreateproduct")
        } catch (error) {
            alert("Some error occured")
        }
    }

    //Function to update product
    const updateProduct = async (product) => {
        try {


            const res = await fetch(`${window.location.origin}/api/admin90/updateproduct/${updateProductId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify({ productImage: image, productName: updateName, productQuantity: updateQuantity, productPrice: updatePrice, productDescription: updateDescription })
            });
            const json = res.json()
            console.log(json)
            formFunctionClose()
            showToast("Product Updated Successfully", "Your Product Updated Successfully", 3000, true, "success", 'top')

        } catch (error) {
            alert("Some error occured")
        }

    }

    //Function to delete product 
    const deleteproduct = async (product) => {
        try {
            const res = await fetch(`${window.location.origin}/api/admin90/deleteproduct/${updateProductId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const json = await res.json()
            console.log(json)
            showToast("Product Deleted Successfully", "Your Product Deleted Successfully", 3000, true, "warning", 'top')


        } catch (error) {
            alert("Some error occured")
        }
    }

    //Function to open modal for updating the product
    const openModalUpdate = (product) => {
        setUpdateProductId(product._id)
        setUpdateName(product.productName);
        setUpdateDescription(product.productDescription);
        setUpdateQuantity(product.productQuantity);
        setUpdatePrice(product.productPrice);
        formFunctionOpen()
    }

    //Function for open modal for deleting the product
    const openModalDelete = (product) => {
        setUpdateProductId(product._id)
        confirmOpen()
    }

    return (
        <>

            <Tabs variant='enclosed' align=''>
                <TabList>
                    <Tab>Create</Tab>
                    <Tab>Show Products</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <section className="text-gray-600 body-font relative">
                            <div className="container px-5 py-18 mx-auto flex flex-col">
                                <div className="flex flex-col text-center w-full mb-12">
                                    <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Admin Panel </h1>
                                    <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Create your products in eCommerce</p>
                                </div>
                                <div className="lg:w-1/2 md:w-2/3 mx-auto">
                                    <div className="flex flex-col flex-wrap -m-2">
                                        {/* <input id='p-image' accept='image/' type='file' onChange={showImage} /> */}
                                        {image === "" || image === null ? "" : <img className="w-24 h-24" src={image} alt="Overview" />}
                                        <div className="p-2 w-1/2">
                                            <div className="relative">
                                                <label htmlFor="image" className="leading-7 text-sm text-gray-600">Product Image</label>
                                                <input type="file" id="image" name="image" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" onChange={convertImageToBase64} />
                                            </div>

                                        </div>
                                        <div className="p-2 w-1/2">
                                            <div className="relative">
                                                <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
                                                <input type="text" id="name" name="name" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" value={name} onChange={(e) => setName(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className="p-2 w-1/2">
                                            <div className="relative">
                                                <label htmlFor="quantity" className="leading-7 text-sm text-gray-600">Quantity</label>
                                                <input type="number" id="quantity" name="quantity" min={1} className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className="p-2 w-1/2">
                                            <div className="relative">
                                                <label htmlFor="price" className="leading-7 text-sm text-gray-600">Price</label>
                                                <input type="number" id="price" name="price" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" value={price} onChange={(e) => setPrice(e.target.value)} />
                                            </div>
                                        </div>

                                        <div className="p-2 w-full">
                                            <div className="relative">
                                                <label htmlFor="message" className="leading-7 text-sm text-gray-600">Description</label>
                                                <textarea id="message" name="message" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                                            </div>
                                        </div>
                                        <div className="p-2 w-full">
                                            <button className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg" onClick={createProduct}>Create Product</button>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </section>
                    </TabPanel>
                    {loading ? <HashLoader color="#36d7b7" className='mx-auto mt-4' /> : ""}
                    <TabPanel>
                        <TableContainer>
                            <Table size='sm'>
                                <Thead>
                                    <Tr>
                                        <Th>Image</Th>
                                        <Th>Name</Th>
                                        <Th isNumeric>Quantity</Th>
                                        <Th isNumeric>Price</Th>
                                        <Th>CRUD</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {
                                        products?.map((product) => {
                                            return <Tr>
                                                <Td><img src={product.productImage} alt='sample' className='w-20 h-20' /></Td>
                                                <Td>{product.productName}</Td>
                                                <Td isNumeric>{product.productQuantity}</Td>
                                                <Td isNumeric>{product.productPrice}</Td>
                                                <Td><Button colorScheme='blue' size="xs" onClick={() => openModalUpdate(product)}>Update</Button><Button colorScheme='red' size="xs" marginLeft={2} onClick={() => openModalDelete(product)}>Delete</Button></Td>
                                            </Tr>
                                        })
                                    }


                                </Tbody>

                                {/* Code for modal */}
                                <Modal
                                    initialFocusRef={initialRef}
                                    finalFocusRef={finalRef}
                                    isOpen={formFunctionIsOpen}
                                    onClose={formFunctionClose}
                                >
                                    {/* Modal for updating proudct */}
                                    <ModalOverlay />
                                    <ModalContent>
                                        <ModalHeader>Update Product</ModalHeader>
                                        <ModalCloseButton />
                                        <ModalBody pb={6}>
                                            <FormControl>
                                                <FormLabel>Image</FormLabel>
                                                <Input ref={initialRef} type='file' onChange={convertImageToBase64} />
                                            </FormControl>
                                            <FormControl>
                                                <FormLabel>Name</FormLabel>
                                                <Input ref={initialRef} placeholder='Product Name' value={updateName} onChange={(e) => setUpdateName(e.target.value)} />
                                            </FormControl>


                                            <FormControl mt={4}>
                                                <FormLabel>Quantity</FormLabel>
                                                <Input placeholder='Quantity' type='number' value={updateQuantity} onChange={(e) => setUpdateQuantity(e.target.value)} />
                                            </FormControl>
                                            <FormControl mt={4}>
                                                <FormLabel>Price</FormLabel>
                                                <Input placeholder='Price' type='number' value={updatePrice} onChange={(e) => setUpdatePrice(e.target.value)} />
                                            </FormControl>
                                            <FormControl mt={4}>
                                                <FormLabel>Description</FormLabel>
                                                <Textarea placeholder='Description' value={updateDescription} onChange={(e) => setUpdateDescription(e.target.value)} />
                                            </FormControl>
                                        </ModalBody>

                                        <ModalFooter>
                                            <Button colorScheme='blue' mr={3} onClick={updateProduct}>
                                                Save
                                            </Button>
                                            <Button onClick={formFunctionClose}>Cancel</Button>
                                        </ModalFooter>
                                    </ModalContent>
                                </Modal>
                                {/* End Code for modal */}

                                {/* Modal for confirmation */}
                                <Modal isOpen={confirmIsOpen} onClose={confirmClose}>
                                    <ModalOverlay />
                                    <ModalContent>
                                        <ModalHeader>Are you want to delete this prouduct?</ModalHeader>
                                        <ModalCloseButton />

                                        <ModalFooter>
                                            <Button colorScheme='red' onClick={deleteproduct}>Delete</Button>
                                            <Button colorScheme='blue' marginLeft={3} mr={3} onClick={confirmClose}>
                                                Close
                                            </Button>

                                        </ModalFooter>
                                    </ModalContent>
                                </Modal>

                            </Table>
                        </TableContainer>
                    </TabPanel>
                </TabPanels>
            </Tabs>




        </>
    )
}

export default AdminCreateProduct
