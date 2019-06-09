#include <nan.h>
using v8::FunctionCallbackInfo;
   using v8::Isolate;
   using v8::Object;
   using v8::String;
   using v8::Value;
   using v8::Handle;

   /**
    *simple function to be export from this c++ code
   **/
 void sayHelloWorld(const FunctionCallbackInfo<Value>& args){
    Isolate* isolate = args.GetIsolate();
       args.GetReturnValue().Set(String::NewFromUtf8(isolate, "Hello World !!!!!!!!!!!"));
   }

/*entry point,we can recieve upto two arguments here.First is export like  module.export
*/
void Init(Handle<Object> exports) {
  NODE_SET_METHOD(exports, "sayHelloWorld", sayHelloWorld);//NODE_SET_MET  HOD to export
}

//to define entry point,first argument must match with target name in binding.gyp
NODE_MODULE(myAddon, Init)