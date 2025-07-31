export default function SignupScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        await AsyncStorage.setItem("userToken", data.token);
      } else {
        Alert.alert("Signup Failed", data.message || "Something went wrong");
      }
    } catch (err) {
      Alert.alert("Error", "Unable to signup. Please try again.");
    }
  };

  return (
    <View>
      <Text>Email</Text>
      <TextInput value={email} onChangeText={setEmail} autoCapitalize="none" />
      <Text>Password</Text>
      <TextInput value={password} onChangeText={setPassword} secureTextEntry />
      <Button title="Signup" onPress={handleSignup} />
    </View>
  );
}
