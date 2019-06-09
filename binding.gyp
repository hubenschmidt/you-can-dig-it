{
  "targets": [
    {
      "target_name": "myAddon", 
      "include_dirs" : [
    "<!(node -e \"require('nan')\")"
],
      "sources": [ "myAddon.cc" ],
    }
  ]
}