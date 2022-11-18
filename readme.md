# CODE ASSIGNMENT - Pariti
## **Vending machine**

# Get started
- Clone project from [https://github.com/jayisaac0/vending-machine](https://github.com/jayisaac0/vending-machine)

- The project takes advantage of Node js fastify framework

# Setup
Clone project to your local machine
```bash
# Clone project from repository via ssl
git clone git@github.com:jayisaac0/vending-machine.git

# Clone project from repository via http
git clone https://github.com/jayisaac0/vending-machine.git

# accss project folder
cd vendine-machine

# If device has vs-code, open the project in it while in root folder
code .

# Install dependencies
npm install

# Rename example.env to .env
mv example.env .env

# Run project
npm run start

```

- To access swagger documentation interface access [http://127.0.0.1:8001/docs/static/index.html](http://127.0.0.1:8001/docs/static/index.html)

## **Swagger documentation**
![alt text](/public/docs.png?raw=true)

To view flow install Mermaid markdown for vs code [https://marketplace.visualstudio.com/items?itemName=bierner.markdown-mermaid](https://marketplace.visualstudio.com/items?itemName=bierner.markdown-mermaid)

## **maintenance users request flow**

```mermaid
sequenceDiagram
    participant Maintainer
    participant Service
    Maintainer->>Module: Create item
    loop Check Availability
        Module->>Module: If item exists update<br>desired fields/..
    end
    Note right of Module: Rational thoughts <br/>prevail!
    Module-->>Maintainer: Return error if any to mainteiner
    Module->>Maintainer: Once done creating<br> return success response back to the mainteiner
```

## **User request flow**

```mermaid
sequenceDiagram
    participant Buyer
    participant Service
    Buyer->>Module: Request item purchase
    Module-->>Module: Check if item is available
    Module-->>Buyer: Return error if item is not available
    Module-->>Module: Check if requested quantiy is available
    Module-->>Buyer: Return error if quantity is not enough
    Module-->>Module: Check if Provided money is to make purchase
    Module->>Processing: Start processing payment made

    participant Processing
    loop Process money
        Processing->>Processing: Start processing and<br> tracking coin and denomination
    end
    Note right of Processing: Rational thoughts <br/>prevail!
    Processing-->>Processing: If denominations are not enough<br>to return expected change
    Processing-->>Buyer: Return error if denomintions are not enough
    Processing-->>Processing: If exact change is returned
    Note right of Processing: This is done when all is successful
    loop Process money
        Processing->>Processing: Update the coins in the vending machine after<br> ensuringexact change will be returned
    end
    Processing->>Buyer: Return success to buyyer when correct change has been processed
```
## **Reference**
Before development i referenced the working of a vending machine and how it handles coins inserted amd how they are output to the buyer 

[![How a vending machine works](/public/machine.png?raw=true)](https://youtu.be/0AkcWjB0UBE "Awesome stuff!!!")

