# frozen_string_literal: true

Gem::Specification.new do |spec|
    spec.name          = "sudouc.club"
    spec.version       = "0.1.0"
    spec.authors       = ["Jed Hodson"]
    spec.email         = ["jedhodson@outlook.com"]
  
    spec.summary       = "The Sudo UC website theme"
    spec.homepage      = "https://sudouc.club"
    spec.license       = "@TODO"
  
    spec.files         = `git ls-files -z`.split("\x0").select { |f| f.match(%r!^(assets|_layouts|_includes|_sass|LICENSE|README|_config\.yml)!i) }
  
    spec.add_runtime_dependency "jekyll", "~> 4.1"
  end
