import React, { useState } from "react";
import { Box, Button, VStack, Heading, Text, List, ListItem, ListIcon, IconButton, useToast } from "@chakra-ui/react";
import { FaCamera, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const [ingredients, setIngredients] = useState([]);
  const toast = useToast();

  // Mock function to handle image capture and API call
  const handleCaptureAndAnalyze = async () => {
    // Simulate image capture
    const capturedImage = "data:image/png;base64,iVBORw0K..."; // Base64 encoded image

    // Simulate API call
    try {
      const response = await mockAnalyzeImage(capturedImage);
      setIngredients(response.ingredients);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to analyze the image.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // Mock API call function
  const mockAnalyzeImage = (imageData) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Mocked response
        const mockResponse = {
          ingredients: [
            { name: "Ingredient A", riskLevel: "High", description: "Linked to health issue X." },
            { name: "Ingredient B", riskLevel: "Medium", description: "May cause health issue Y in high doses." },
            { name: "Ingredient C", riskLevel: "Low", description: "Generally recognized as safe." },
          ],
        };
        resolve(mockResponse);
      }, 1000);
    });
  };

  return (
    <VStack spacing={6} align="stretch" p={5}>
      <Heading as="h1" size="xl" textAlign="center">
        Ingredient Analyzer
      </Heading>
      <Text textAlign="center">Take a photo of the product ingredients and find out their health risk.</Text>
      const navigate = useNavigate();
      <Button leftIcon={<FaCamera />} colorScheme="teal" onClick={() => navigate("/camera")}>
        Capture Ingredients
      </Button>
      <IconButton aria-label="Capture Ingredients" icon={<FaCamera />} size="lg" colorScheme="teal" onClick={handleCaptureAndAnalyze} style={{ display: "none" }} />
      {ingredients.length > 0 && (
        <Box mt={5}>
          <Heading as="h2" size="lg">
            Analyzed Ingredients
          </Heading>
          <List spacing={3}>
            {ingredients.map((ingredient, index) => (
              <ListItem key={index}>
                <ListIcon as={FaSearch} color={getColorForRiskLevel(ingredient.riskLevel)} />
                <strong>{ingredient.name}</strong> - {ingredient.riskLevel} risk
                <Text fontSize="sm">{ingredient.description}</Text>
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </VStack>
  );
};

// Helper function to get color based on risk level
const getColorForRiskLevel = (riskLevel) => {
  switch (riskLevel) {
    case "High":
      return "red.500";
    case "Medium":
      return "orange.400";
    case "Low":
      return "green.500";
    default:
      return "gray.500";
  }
};

export default Index;
